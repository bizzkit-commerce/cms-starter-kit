import { Builder } from '@builder.io/react'
import viewCarouselIcon from '../../assets/view_carousel.svg'
import { DynamicProductSlider } from './DynamicProductSlider'

export const registerDynamicProductSlider = (): string => {
    const name = 'DynamicProductSlider'

    Builder.registerComponent(DynamicProductSlider, {
        name,
        image: new URL(viewCarouselIcon, window.location.origin).href,
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

    return name
}
