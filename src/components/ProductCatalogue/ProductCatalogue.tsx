import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material'
import * as React from 'react'
import {
    DynamicProductListModel,
    searchProducts,
    SearchResult,
    SortModel,
} from '../../util/search'
import { ProductCardBase } from '../ProductCardBase'

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
        products?.phrase === undefined || products.phrase === ''
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

        void (async (): Promise<void> => {
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
        (event: SelectChangeEvent<Sorting>): void => {
            setSorting(event.target.value as Sorting)
        },
        [],
    )

    const onMoreClick = React.useCallback(() => {
        setPage((page) => page + 1)
    }, [])

    return (
        <Box sx={{ mb: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    marginBottom: 3,
                }}
            >
                {
                    // Hide search input if search phrase has been provided
                    // by the plugin
                    (products?.phrase === undefined ||
                        products.phrase === '') && (
                        <TextField
                            label='Search'
                            value={phraseFilter}
                            onInput={onPhraseFilterInput}
                            sx={(theme) => ({
                                width: '100%',
                                [theme.breakpoints.up('md')]: {
                                    width: '400px',
                                },
                            })}
                        />
                    )
                }

                <FormControl
                    sx={(theme) => ({
                        marginLeft: 'auto',
                        width: '100%',
                        [theme.breakpoints.up('md')]: {
                            width: '300px',
                        },
                    })}
                >
                    <InputLabel id='sorting-label'>Sorting</InputLabel>
                    <Select
                        id='sorting-select'
                        labelId='sorting-label'
                        label='Sorting'
                        value={sorting}
                        onChange={onSortingChange}
                    >
                        <MenuItem value={Sorting.PriceAscending}>
                            Price - ascending
                        </MenuItem>
                        <MenuItem value={Sorting.PriceDescending}>
                            Price - descending
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box
                component='ol'
                aria-label='Products'
                sx={(theme) => ({
                    listStyle: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridAutoRows: 'auto',
                    gap: 2,
                    padding: 0,
                    marginBottom: 3,
                    [theme.breakpoints.up('md')]: {
                        gridTemplateColumns: 'repeat(3, 1fr)',
                    },
                    [theme.breakpoints.up('lg')]: {
                        gridTemplateColumns: 'repeat(4, 1fr)',
                    },
                })}
            >
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
                        product.media?.find((media) => media.type === 'Image')
                            ?.url ?? undefined

                    const lowestPrice =
                        (product.skus ?? [])
                            .flatMap((sku) =>
                                typeof sku.price?.price === 'number'
                                    ? [sku.price.price]
                                    : [],
                            )
                            .sort()
                            .at(0) ?? undefined

                    const combinedStock = (product.skus ?? [])
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
                                sx={{
                                    height: '100%',
                                }}
                            />
                        </li>
                    )
                })}
            </Box>
            <Box
                role='navigation'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography>
                    Displaying <b>{searchResult?.products.length ?? '...'}</b>{' '}
                    out of <b>{searchResult?.totalProducts ?? '...'}</b>{' '}
                    products
                </Typography>
                {page < pageCount - 1 && (
                    <Button
                        type='button'
                        variant='outlined'
                        onClick={onMoreClick}
                    >
                        Show more products
                    </Button>
                )}
            </Box>
        </Box>
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
