import { Builder } from '@builder.io/react'
import viewCarouselIcon from '../../assets/view_carousel.svg'
import { ProductSlider } from './ProductSlider'

export const registerProductSlider = (): string => {
    const name = 'ProductSlider'

    Builder.registerComponent(ProductSlider, {
        name,
        image: new URL(viewCarouselIcon, window.location.origin).href,
        inputs: [
            {
                name: 'title',
                type: 'string',
                defaultValue: 'See our new arrivals',
            },
            {
                type: 'Bizzkit ECS Product List',
                name: 'products',
            },
        ],
    })

    return name
}
