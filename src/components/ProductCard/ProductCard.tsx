import * as React from 'react'
import { getProductById, Product } from '../../util/search'
import { ProductCardBase } from '../ProductCardBase'

export interface ProductCardProps {
    readonly product?: null | {
        readonly id: string
        readonly segmentId: string
        readonly scopeId: string
    }
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
    const [product, setProduct] = React.useState<null | Product>(null)

    React.useEffect((): void => {
        if (props.product === undefined || props.product === null) {
            return
        }

        const productId = props.product

        ;(async () => {
            setProduct(await getProductById(productId))
        })()
    }, [props.product])

    const imageUrl =
        product?.media?.find((media) => media.type === 'Image')?.url ??
        undefined

    const lowestPrice =
        (product?.skus ?? [])
            .flatMap((sku) =>
                typeof sku.price?.price === 'number' ? [sku.price.price] : [],
            )
            .sort()
            .at(0) ?? undefined

    const combinedStock = (product?.skus ?? [])
        .flatMap((sku) => sku.numberAttributes?.Stock?.values ?? [])
        .reduce((value, result) => value + result, 0)

    return (
        <ProductCardBase
            loading={product === null}
            title={product?.name ?? undefined}
            imageUrl={imageUrl}
            stock={combinedStock}
            price={lowestPrice}
        />
    )
}
