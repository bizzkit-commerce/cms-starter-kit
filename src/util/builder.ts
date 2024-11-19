import { Builder, builder } from '@builder.io/react'
import { registerDamImage } from '../components/DamImage'
import { registerDamVideo } from '../components/DamVideo'
import { registerDynamicProductSlider } from '../components/DynamicProductSlider'
import { registerProductCard } from '../components/ProductCard'
import { registerProductCatalogue } from '../components/ProductCatalogue'
import { registerProductSlider } from '../components/ProductSlider'

export const initBuilder = (): void => {
    builder.init(import.meta.env.VITE_BUILDER_API_KEY)

    Builder.register('insertMenu', {
        name: 'Bizzkit',
        items: [
            { name: registerDamImage() },
            { name: registerDamVideo() },
            { name: registerProductCard() },
            { name: registerProductSlider() },
            { name: registerDynamicProductSlider() },
            { name: registerProductCatalogue() },
        ],
    })
}
