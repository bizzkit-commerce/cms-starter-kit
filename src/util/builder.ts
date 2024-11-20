import { Builder, builder } from '@builder.io/react'
import { registerDamImage } from '../components/DamImage'
import { registerDamVideo } from '../components/DamVideo'
import { registerDynamicProductSlider } from '../components/DynamicProductSlider'
import { registerProductCard } from '../components/ProductCard'
import { registerProductCatalogue } from '../components/ProductCatalogue'
import { registerProductSlider } from '../components/ProductSlider'
import * as Theme from './theme'

export const initBuilder = (): void => {
    builder.init(import.meta.env.VITE_BUILDER_API_KEY)

    // Custom component registration
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

    const colors = Theme.colors.map(
        ({ displayName, cssVariableName, value }) => ({
            name: displayName,
            value: `var(${cssVariableName}, ${value})`,
        }),
    )

    const spacing = Theme.spacing.map(
        ({ displayName, cssVariableName, value }) => ({
            name: displayName,
            value: `var(${cssVariableName}, ${value})`,
        }),
    )

    Builder.register('editor.settings', {
        /**
         * Expose MUI theme variables to Builder using design tokens
         * https://www.builder.io/c/docs/design-tokens
         */
        designTokens: {
            // Prevent users from selecting custom fonts
            fontFamily: false,
            colors,
            spacing,
        },
    })
}
