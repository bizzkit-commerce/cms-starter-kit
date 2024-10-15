import * as React from 'react'
import { Product } from '../../util/search'
import { ProductCardBase } from '../ProductCardBase'
import styles from './ProductSliderBase.module.css'
import { ProductSliderBaseArrow } from './ProductSliderBaseArrow'

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

    return (
        <section className={styles['container']}>
            <div className={styles['slider-header']}>
                {title !== undefined && (
                    <header className={styles['slider-title']}>{title}</header>
                )}

                <ProductSliderBaseArrow
                    direction='left'
                    onClick={onArrowLeftClick}
                />
                <ProductSliderBaseArrow
                    direction='right'
                    onClick={onArrowRightClick}
                />
            </div>

            <div className={styles['slider']} ref={sliderRef}>
                {loading &&
                    [...Array(skeletonCount ?? 6)].map((_, index) => (
                        <ProductCardBase
                            key={index}
                            className={styles['product']}
                            loading={true}
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
                                className={styles['product']}
                                title={product.name ?? undefined}
                                imageUrl={imageUrl}
                                price={lowestPrice}
                                stock={combinedStock}
                            />
                        )
                    })}
            </div>
        </section>
    )
}
