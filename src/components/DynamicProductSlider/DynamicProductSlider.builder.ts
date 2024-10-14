import { Builder } from '@builder.io/react'
import viewCarouselIcon from '../../assets/view_carousel.svg?raw'
import { DynamicProductSlider } from './DynamicProductSlider'

export const registerDynamicProductSlider = () => {
    Builder.registerComponent(DynamicProductSlider, {
        name: 'DynamicProductSlider',
        image: `data:image/svg+xml;base64,${btoa(viewCarouselIcon)}`,
        inputs: [
            {
                name: 'title',
                type: 'string',
                defaultValue: 'See our new arrivals',
            },
            {
                name: 'products',
                type: 'Bizzkit ECS Dynamic Product List',
            },
            {
                name: 'productCount',
                type: 'number',
                helperText: 'Number of products to show',
                defaultValue: 6,
            },
        ],
    })
}
