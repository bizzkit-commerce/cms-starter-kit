import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import { BuilderContent } from '@builder.io/sdk'
import { Typography } from '@mui/material'
import Container from '@mui/material/Container'
import * as React from 'react'
import { SeoMetadata } from '../SeoMetadata'

export const Page: React.FC = () => {
    const isPreviewingInBuilder = useIsPreviewing()
    const [notFound, setNotFound] = React.useState(false)
    const [content, setContent] = React.useState<BuilderContent>()

    React.useEffect(() => {
        async function fetchContent(): Promise<void> {
            const content = (await builder
                .get('page', {
                    url: window.location.pathname,
                })
                .promise()) as undefined | BuilderContent

            setContent(content)
            setNotFound(content === undefined)
        }

        void fetchContent()
    }, [])

    return (
        <>
            <SeoMetadata content={content} />
            <title>
                {content?.data?.['title'] ?? 'Bizzkit CMS Starter Kit'}
            </title>
            <Container>
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
