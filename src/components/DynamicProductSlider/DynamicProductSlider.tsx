import * as React from 'react'
import {
    DynamicProductListModel,
    Product,
    searchProducts,
} from '../../util/search'
import { ProductSliderBase } from '../ProductSliderBase'

export interface DynamicProductSliderProps {
    readonly title?: null | string
    readonly products?: null | DynamicProductListModel
    readonly productCount?: null | number
}

export const DynamicProductSlider: React.FC<DynamicProductSliderProps> = ({
    title = null,
    products = null,
    productCount,
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

            const result = await searchProducts({
                segmentId: products.segmentId,
                scopeId: products.scopeId,
                phrase: products.phrase,
                filters: products.filters,
                numberOfProducts: productCount ?? 6,
            })

            setProductInfo(result.products)
        })()
    }, [products, productCount])

    return (
        <ProductSliderBase
            loading={productInfo === null}
            title={title ?? undefined}
            products={productInfo ?? []}
            skeletonCount={productCount ?? 6}
        />
    )
}
