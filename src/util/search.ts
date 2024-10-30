export interface ProductId {
    readonly id: string
    readonly segmentId: string
    readonly scopeId: string
}

export interface Product {
    readonly id?: null | string
    readonly name?: null | string
    readonly media?: null | readonly ProductMedia[]
    readonly skus?: null | readonly ProductSku[]
}

export interface ProductMedia {
    readonly url?: null | string
    readonly type?: null | string
}

export interface ProductSku {
    readonly price?: null | {
        readonly price?: number
        readonly listPrice?: number
    }
    readonly numberAttributes?: null | {
        // Expects the Stock attribute to have been setup in Search
        readonly Stock?: null | { readonly values?: null | readonly number[] }
    }
}

export interface DynamicProductListModel {
    readonly segmentId: string
    readonly scopeId: string
    readonly phrase: string
    readonly filters: readonly FilterModel[]
}

export enum FilterType {
    TermFilter = 'TermFilter',
    RangeFilter = 'RangeFilter',
}

export type FilterModel = TermFilter | RangeFilter

export interface TermFilter {
    readonly type: FilterType.TermFilter
    readonly key: string
    readonly values: readonly string[]
}

export interface RangeFilter {
    readonly type: FilterType.RangeFilter
    readonly key: string
    readonly from: number
    readonly to: number
}

export interface SortModel {
    readonly key: string
    readonly order: 'asc' | 'desc'
}

export const getProductById = async (
    productId: ProductId,
): Promise<null | Product> => {
    const url = new URL('/search', import.meta.env.VITE_SEARCH_URL)
    url.searchParams.append('api-version', '24.0')

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            segmentId: productId.segmentId,
            scopeId: productId.scopeId,
            numberOfContent: 0,
            numberOfProducts: 1,
            filters: {
                SearchableIds: {
                    values: [productId.id],
                },
            },
        }),
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const result: { products?: Product[] } = await response.json()
    const product = result?.products?.at(0) ?? null

    return product
}

export const getProductsById = async (
    productIds: readonly ProductId[],
): Promise<null | readonly Product[]> => {
    // Group up products that can be retrieved with a single request
    const groupedBySegmentAndScope = new Map<string, ProductId[]>()

    for (const productId of productIds) {
        const key = JSON.stringify({
            segmentId: productId.segmentId,
            scopeId: productId.scopeId,
        })

        const group = groupedBySegmentAndScope.get(key) ?? []
        group.push(productId)
        groupedBySegmentAndScope.set(key, group)
    }

    const url = new URL('/search', import.meta.env.VITE_SEARCH_URL)
    url.searchParams.append('api-version', '24.0')

    const requests = Array.from(groupedBySegmentAndScope.entries()).map(
        async ([key, group]) => {
            const { segmentId, scopeId } = JSON.parse(key) as {
                segmentId: string
                scopeId: string
            }

            return searchProducts({
                segmentId,
                scopeId,
                numberOfProducts: productIds.length,
                filters: [
                    {
                        type: FilterType.TermFilter,
                        key: 'SearchableIds',
                        values: group.map((productId) => productId.id),
                    },
                ],
            })
        },
    )

    const responses = await Promise.allSettled(requests)

    return responses.flatMap((response) => {
        switch (response.status) {
            case 'rejected':
                console.error(response.reason)
                return []

            case 'fulfilled':
                return response.value.products
        }
    })
}

export interface SearchResult {
    readonly products: readonly Product[]
    readonly totalProducts: number
    readonly originalPhrase: string
    readonly usedPhrase: string
}

export const searchProducts = async (params: {
    readonly segmentId: string
    readonly scopeId: string
    readonly numberOfProducts: number
    readonly offsetProducts?: number
    readonly phrase?: string
    readonly filters?: readonly FilterModel[]
    readonly sort?: readonly SortModel[]
    readonly abortSignal?: AbortSignal
}): Promise<SearchResult> => {
    const url = new URL('/search', import.meta.env.VITE_SEARCH_URL)
    url.searchParams.append('api-version', '24.0')

    const filters = Object.fromEntries(
        (params.filters ?? []).map((filter) => {
            switch (filter.type) {
                case FilterType.RangeFilter:
                    return [
                        filter.key,
                        {
                            from: filter.from,
                            to: filter.to,
                        },
                    ]

                case FilterType.TermFilter:
                    return [
                        filter.key,
                        {
                            values: filter.values,
                        },
                    ]
            }
        }),
    )

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            segmentId: params.segmentId,
            scopeId: params.scopeId,
            phrase: params.phrase,
            numberOfContent: 0,
            numberOfProducts: params.numberOfProducts,
            offsetProducts: params.offsetProducts,
            filters,
            sort: params.sort,
        }),
        signal: params.abortSignal,
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const result: SearchResult = await response.json()

    return result
}
