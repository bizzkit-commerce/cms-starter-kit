import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import { BuilderContent } from '@builder.io/sdk'
import { Typography } from '@mui/material'
import Container from '@mui/material/Container'
import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { SeoMetadata } from '../SeoMetadata'
import { Usp } from '../Usp'

export const Page: React.FC = () => {
    const isPreviewingInBuilder = useIsPreviewing()
    const [notFound, setNotFound] = React.useState(false)
    const [content, setContent] = React.useState<BuilderContent>()

    React.useEffect(() => {
        async function fetchContent(): Promise<void> {
            const content: undefined | BuilderContent = await builder
                .get('page', {
                    url: window.location.pathname,
                })
                .promise()

            setContent(content)
            setNotFound(content === undefined)
        }

        void fetchContent()
    }, [window.location.pathname])

    return (
        <>
            <SeoMetadata content={content} />
            <Helmet>
                <title>
                    {content?.data?.['title'] ?? 'Bizzkit CMS Starter Kit'}
                </title>
            </Helmet>
            <Usp />
            <Container>
                <Typography variant='h1' sx={{ my: 4 }}>
                    Bizzkit CMS Starter Kit
                </Typography>
                {notFound && !isPreviewingInBuilder && (
                    <Typography variant='body1'>Not found</Typography>
                )}
                {(!notFound || isPreviewingInBuilder) && (
                    <BuilderComponent model='page' content={content} />
                )}
            </Container>
        </>
    )
}
