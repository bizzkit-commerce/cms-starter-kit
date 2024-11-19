import { Builder } from '@builder.io/react'
import sellIcon from '../../assets/sell.svg'
import { ProductCard } from './ProductCard'

export const registerProductCard = (): string => {
    const name = 'ProductCard'

    Builder.registerComponent(ProductCard, {
        name,
        image: new URL(sellIcon, window.location.origin).href,
        inputs: [
            {
                name: 'product',
                type: 'Bizzkit ECS Product',
                required: true,
            },
        ],
    })

    return name
}
