import { Builder } from '@builder.io/react'
import sellIcon from '../../assets/sell.svg?raw'
import { ProductCard } from './ProductCard'

export const registerProductCard = (): void => {
    Builder.registerComponent(ProductCard, {
        name: 'ProductCard',
        image: `data:image/svg+xml;base64,${btoa(sellIcon)}`,
        inputs: [
            {
                name: 'product',
                type: 'Bizzkit ECS Product',
                required: true,
            },
        ],
    })
}
