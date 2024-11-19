import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, IconButton, SxProps, Theme, Typography } from '@mui/material'
import * as React from 'react'
import { Product } from '../../util/search'
import { ProductCardBase } from '../ProductCardBase'

export interface ProductSliderBaseProps {
    readonly loading?: boolean
    readonly title?: string
    readonly products?: readonly Product[]
    readonly skeletonCount?: number
}

export const ProductSliderBase: React.FC<ProductSliderBaseProps> = ({
    loading = false,
    title,
    products = [],
    skeletonCount = 6,
}) => {
    const sliderRef = React.useRef<null | HTMLDivElement>(null)

    const onArrowRightClick = React.useCallback((): void => {
        if (sliderRef.current === null) return

        sliderRef.current.scrollBy({
            behavior: 'smooth',
            left: sliderRef.current.offsetWidth,
        })
    }, [])

    const onArrowLeftClick = React.useCallback((): void => {
        if (sliderRef.current === null) return

        sliderRef.current.scrollBy({
            behavior: 'smooth',
            left: -sliderRef.current.offsetWidth,
        })
    }, [])

    const productCardSx: SxProps<Theme> = (theme) => ({
        minWidth: '50%',
        [theme.breakpoints.up('md')]: {
            minWidth: 'calc(100% / 3)',
        },
        [theme.breakpoints.up('lg')]: {
            minWidth: '25%',
        },
    })

    return (
        <Box
            component='section'
            sx={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: '"title arrow-left arrow-right"',
                    gap: 1,
                    alignItems: 'center',
                    paddingY: 3,
                    paddingX: 2,
                }}
            >
                {title !== undefined && (
                    <Typography variant='h4'>{title}</Typography>
                )}

                <IconButton aria-label='Scroll left' onClick={onArrowLeftClick}>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                    aria-label='Scroll right'
                    onClick={onArrowRightClick}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            <Box
                ref={sliderRef}
                sx={{
                    gridArea: 'slider',
                    display: 'flex',
                    gap: 2,
                    padding: 1,
                    overflowX: 'hidden',
                }}
            >
                {loading &&
                    Array.from(Array(skeletonCount ?? 6)).map((_, index) => (
                        <ProductCardBase
                            key={index}
                            loading={true}
                            sx={productCardSx}
                        />
                    ))}

                {!loading &&
                    products.map((product, index) => {
                        const imageUrl =
                            product?.media?.find(
                                (media) => media.type === 'Image',
                            )?.url ?? undefined

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
                                (sku) =>
                                    sku.numberAttributes?.Stock?.values ?? [],
                            )
                            .reduce((value, result) => value + result, 0)

                        return (
                            <ProductCardBase
                                key={index}
                                sx={productCardSx}
                                title={product.name ?? undefined}
                                imageUrl={imageUrl}
                                price={lowestPrice}
                                stock={combinedStock}
                            />
                        )
                    })}
            </Box>
        </Box>
    )
}
