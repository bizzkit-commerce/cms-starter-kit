import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import { Typography } from '@mui/material'
import Container from '@mui/material/Container'
import * as React from 'react'
import { Usp } from '../Usp'

type BuilderContent = React.ComponentProps<typeof BuilderComponent>['content']

export const Page: React.FC = () => {
    const isPreviewingInBuilder = useIsPreviewing()
    const [notFound, setNotFound] = React.useState(false)
    const [content, setContent] = React.useState<BuilderContent>()

    React.useEffect(() => {
        async function fetchContent(): Promise<void> {
            const content = await builder
                .get('page', {
                    url: window.location.pathname,
                })
                .promise()

            setContent(content)
            setNotFound(!content)

            // if the page title is found,
            // set the document title
            if (content?.data.title) {
                document.title = content.data.title
            }
        }

        fetchContent()
    }, [window.location.pathname])

    return (
        <>
            <Usp />
            <Container>
                <Typography variant='h1' sx={{ my: 4 }}>
                    Bizzkit Starter Kit
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
