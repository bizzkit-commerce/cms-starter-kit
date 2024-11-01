import * as React from 'react'
import {
    DynamicProductListModel,
    searchProducts,
    SearchResult,
    SortModel,
} from '../../util/search'
import { ProductCardBase } from '../ProductCardBase'
import styles from './ProductCatalogue.module.css'

export interface ProductCatalogueProps {
    readonly products?: null | DynamicProductListModel
    readonly pageSize?: null | number
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
    products,
    pageSize,
}) => {
    const [page, setPage] = React.useState<number>(0)
    const [loading, setLoading] = React.useState(true)
    const [phraseInputValue, setPhraseInputValue] = React.useState('')
    const [sorting, setSorting] = React.useState(Sorting.PriceAscending)

    const phraseFilter = React.useDeferredValue(
        // Use phrase set it the plugin if provided, otherwise use
        // search field value
        products?.phrase === undefined || products?.phrase === ''
            ? phraseInputValue
            : products.phrase,
    )

    const [searchResult, setSearchResult] = React.useState<null | SearchResult>(
        null,
    )

    const actualPageSize = pageSize ?? 12

    const pageCount = Math.ceil(
        (searchResult?.totalProducts ?? 0) / actualPageSize,
    )

    React.useEffect((): void => {
        setSearchResult(null)
        setPage(0)
    }, [phraseFilter, sorting, products])

    React.useEffect(() => {
        const abortController = new AbortController()

        ;(async (): Promise<void> => {
            if (products === undefined || products === null) return

            setLoading(true)

            try {
                const newResult = await searchProducts({
                    phrase: phraseFilter,
                    segmentId: products.segmentId,
                    scopeId: products.scopeId,
                    numberOfProducts: actualPageSize,
                    offsetProducts: page * actualPageSize,
                    filters: products.filters,
                    sort: [sortingToSortModel(sorting)],
                    abortSignal: abortController.signal,
                })

                setSearchResult((currentResult) =>
                    currentResult === null
                        ? newResult
                        : {
                              ...newResult,
                              products: [
                                  ...currentResult.products,
                                  ...newResult.products,
                              ],
                          },
                )
            } catch (error) {
                if (error !== 'Cancelled') {
                    console.error(error)
                }
            }

            setLoading(false)
        })()

        return () => {
            abortController.abort('Cancelled')
        }
    }, [phraseFilter, sorting, page, products, actualPageSize])

    const onPhraseFilterInput = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            setPhraseInputValue(event.target.value)
        },
        [],
    )

    const onSortingChange = React.useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>): void => {
            setSorting(event.target.value as Sorting)
        },
        [],
    )

    const onMoreClick = React.useCallback(() => {
        setPage((page) => page + 1)
    }, [])

    return (
        <section className={styles['container']}>
            <div className={styles['filters']}>
                {
                    // Hide search input if search phrase has been provided
                    // by the plugin
                    (products?.phrase === undefined ||
                        products?.phrase === '') && (
                        <input
                            aria-label='Search'
                            type='text'
                            placeholder='Search...'
                            className={styles['search']}
                            value={phraseFilter}
                            onInput={onPhraseFilterInput}
                        />
                    )
                }

                <select
                    aria-label='Sorting'
                    value={sorting}
                    onChange={onSortingChange}
                    className={styles['sorting']}
                >
                    <option value={Sorting.PriceAscending}>
                        Price - ascending
                    </option>
                    <option value={Sorting.PriceDescending}>
                        Price - descending
                    </option>
                </select>
            </div>
            <ol aria-label='Products' className={styles['products']}>
                {loading &&
                    Array.from(
                        Array(
                            searchResult === null || page < pageCount - 1
                                ? actualPageSize
                                : Math.max(
                                      searchResult.totalProducts -
                                          searchResult.products.length,
                                      0,
                                  ),
                        ),
                    ).map((_, index) => (
                        <li key={index}>
                            <ProductCardBase loading />
                        </li>
                    ))}

                {searchResult?.products.map((product, index) => {
                    const imageUrl =
                        product?.media?.find((media) => media.type === 'Image')
                            ?.url ?? undefined

                    const lowestPrice =
                        (product?.skus ?? [])
                            .flatMap((sku) =>
                                typeof sku.price?.price === 'number'
                                    ? [sku.price.price]
                                    : [],
                            )
                            .sort()
                            .at(0) ?? undefined

                    const combinedStock = (product?.skus ?? [])
                        .flatMap(
                            (sku) => sku.numberAttributes?.Stock?.values ?? [],
                        )
                        .reduce((value, result) => value + result, 0)

                    return (
                        <li key={index}>
                            <ProductCardBase
                                title={product.name ?? undefined}
                                imageUrl={imageUrl}
                                price={lowestPrice}
                                stock={combinedStock}
                            />
                        </li>
                    )
                })}
            </ol>
            <div role='navigation' className={styles['navigation']}>
                <p>
                    Displaying <b>{searchResult?.products.length ?? '...'}</b>{' '}
                    out of <b>{searchResult?.totalProducts ?? '...'}</b>{' '}
                    products
                </p>
                {page < pageCount - 1 && (
                    <button type='button' onClick={onMoreClick}>
                        Show more products
                    </button>
                )}
            </div>
        </section>
    )
}

enum Sorting {
    PriceAscending = 'PriceAscending',
    PriceDescending = 'PriceDescending',
}

const sortingToSortModel = (sorting: Sorting): SortModel => {
    switch (sorting) {
        case Sorting.PriceAscending:
            return {
                key: 'price',
                order: 'asc',
            }

        case Sorting.PriceDescending:
            return {
                key: 'price',
                order: 'desc',
            }
    }
}
