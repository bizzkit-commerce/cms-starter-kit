import * as React from 'react'
import { getProductsById, Product, ProductId } from '../../util/search'
import { ProductSliderBase } from '../ProductSliderBase'

export interface ProductSliderProps {
    readonly title?: null | string
    readonly products?: null | ProductId[]
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
    title = null,
    products = null,
}) => {
    const [productInfo, setProductInfo] = React.useState<
        null | readonly Product[]
    >(null)

    React.useEffect(() => {
        void (async (): Promise<void> => {
            if (products === null) {
                setProductInfo(null)
                return
            }

            setProductInfo(await getProductsById(products))
        })()
    }, [products])

    return (
        <ProductSliderBase
            loading={productInfo === null}
            title={title ?? undefined}
            products={productInfo ?? []}
            skeletonCount={products?.length ?? 6}
        />
    )
}
