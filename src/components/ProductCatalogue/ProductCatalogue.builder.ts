import { Builder } from '@builder.io/react'
import sellIcon from '../../assets/sell.svg?raw'
import { ProductCatalogue } from './ProductCatalogue'

export const registerProductCatalogue = (): void => {
    Builder.registerComponent(ProductCatalogue, {
        name: 'ProductCatalogue',
        image: `data:image/svg+xml;base64,${btoa(sellIcon)}`,
        inputs: [
            {
                name: 'products',
                type: 'Bizzkit ECS Dynamic Product List',
            },
            {
                name: 'pageSize',
                type: 'number',
                helperText:
                    'Maximum number of products to be displayed in a single page',
                defaultValue: 6,
            },
        ],
    })
}
