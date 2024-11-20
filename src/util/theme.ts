import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1E2B56',
            light: '#4B5383',
            dark: '#00002D',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#7F509B',
            light: '#B07DCC',
            dark: '#51256C',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#000000DE',
            secondary: '#1E2B5699',
            disabled: '#1E2B5661',
        },
        error: {
            main: '#D64B4B',
            dark: '#9F1123',
            light: '#FF7D77',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#009E52',
            dark: '#006E27',
            light: '#52D07F',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#F36E24',
            dark: '#B93E00',
            light: '#FF9F53',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#5A6E9D',
            dark: '#2C436E',
            light: '#899CCE',
            contrastText: '#FFFFFF',
        },
        action: {
            active: '#0000008A',
            hover: '#0000000A',
            selected: '#00000014',
            disabled: '#00000042',
            disabledBackground: '#0000001F',
            focus: '#0000001F',
        },
    },
})

/**
 * A theme color
 * @example
 * {
 *     displayName: 'primary',
 *     cssVariableName: '--color-primary',
 *     value: '#f81384'
 * }
 */
export interface Color {
    readonly displayName: string
    readonly cssVariableName: string
    readonly value: string
}

/**
 * Recursively extracts name-value pairs from MUI theme's palette
 */
const getColorVariables = (
    paletteEntries: [string, unknown][] = Object.entries(theme.palette),
): readonly Color[] => {
    return paletteEntries
        .flatMap(toColorVariable)
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
}

const toColorVariable = ([name, value]: [
    string,
    unknown,
]): readonly Color[] => {
    switch (typeof value) {
        /**
         * A value like '#4c4c4c'
         */
        case 'string':
            return CSS.supports('color', value)
                ? [
                      {
                          displayName: name,
                          cssVariableName: `--color-${name.replaceAll('.', '-')}`,
                          value,
                      },
                  ]
                : []

        /**
         * An object like { main: '#735313', dark: '#131115' }
         */
        case 'object':
            return getColorVariables(
                Object.entries(value ?? {}).map(([propName, propValue]) => [
                    `${name}.${propName}`,
                    propValue,
                ]),
            )

        default:
            return []
    }
}

export const colors = getColorVariables()

/**
 * A theme spacing size
 * @example
 * {
 *     displayName: 'md',
 *     cssVariableName: '--spacing-md',
 *     value: '12px'
 * }
 */
export interface Spacing {
    readonly displayName: string
    readonly cssVariableName: string
    readonly value: string
}

const getSpacingVariables = (): readonly Spacing[] => {
    const spacing = [
        ['xs', 1],
        ['sm', 2],
        ['md', 3],
        ['lg', 4],
        ['xl', 5],
    ] as const

    return spacing.map(([name, size]) => ({
        displayName: name,
        cssVariableName: `--spacing-${name}`,
        value: theme.spacing(size),
    }))
}

export const spacing = getSpacingVariables()
