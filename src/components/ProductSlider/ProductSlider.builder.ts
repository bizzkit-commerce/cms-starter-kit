import { Builder } from '@builder.io/react'
import viewCarouselIcon from '../../assets/view_carousel.svg?raw'
import { ProductSlider } from './ProductSlider'

export const registerProductSlider = () => {
    Builder.registerComponent(ProductSlider, {
        name: 'ProductSlider',
        image: `data:image/svg+xml;base64,${btoa(viewCarouselIcon)}`,
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
            {
                type: 'number',
                name: 'productCount',
                helperText: 'Number of products to show',
                defaultValue: 6,
            },
        ],
    })
}
