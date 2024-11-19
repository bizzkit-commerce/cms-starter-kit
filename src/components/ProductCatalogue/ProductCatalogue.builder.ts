import { Builder } from '@builder.io/react'
import menuBookIcon from '../../assets/menu_book.svg'
import { ProductCatalogue } from './ProductCatalogue'

export const registerProductCatalogue = (): string => {
    const name = 'ProductCatalogue'

    Builder.registerComponent(ProductCatalogue, {
        name,
        image: new URL(menuBookIcon, window.location.origin).href,
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

    return name
}
