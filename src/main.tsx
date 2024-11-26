import { GlobalStyles, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import * as ReactClient from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { CssVariables } from './components/CssVariables'
import { Layout } from './components/Layout'
import { Page } from './components/Page'
import { initBuilder } from './util/builder'
import { theme } from './util/theme'

initBuilder()

const root = ReactClient.createRoot(document.getElementById('main')!)

root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <CssVariables />
        <GlobalStyles
            styles={{
                h1: theme.typography.h1,
                h2: theme.typography.h2,
                h3: theme.typography.h3,
                h4: theme.typography.h4,
                h5: theme.typography.h5,
                h6: theme.typography.h6,
            }}
        />
        <CssVariables />
        <HelmetProvider>
            <Layout>
                <Page />
            </Layout>
        </HelmetProvider>
    </ThemeProvider>,
)
