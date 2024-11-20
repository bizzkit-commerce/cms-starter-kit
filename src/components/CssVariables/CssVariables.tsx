import { GlobalStyles } from '@mui/material'
import * as React from 'react'
import { colors, spacing } from '../../util/theme'

const colorVariables = Object.fromEntries(
    colors.map(({ cssVariableName, value }) => [cssVariableName, value]),
)

const spacingVariables = Object.fromEntries(
    spacing.map(({ cssVariableName, value }) => [cssVariableName, value]),
)

/**
 * Component that registers the current theme's values as CSS variables
 * to be used with Builder
 */
export const CssVariables: React.FC = () => {
    return (
        <GlobalStyles
            styles={{
                ':root': {
                    ...colorVariables,
                    ...spacingVariables,
                },
            }}
        />
    )
}
