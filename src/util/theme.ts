import { createTheme } from '@mui/material'

export default createTheme({
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
