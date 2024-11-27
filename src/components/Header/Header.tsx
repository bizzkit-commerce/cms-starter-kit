import { builder, BuilderComponent } from '@builder.io/react'
import { BuilderContent } from '@builder.io/sdk'
import { Box, Container, Skeleton, Typography } from '@mui/material'
import React from 'react'

export const Header: React.FC = () => {
    const [notFound, setNotFound] = React.useState(false)
    const [header, setHeader] = React.useState<BuilderContent>()

    React.useEffect(() => {
        async function fetchUsp(): Promise<void> {
            const header = (await builder
                .get('header', {
                    url: window.location.pathname,
                })
                .promise()) as undefined | BuilderContent

            setHeader(header)
            setNotFound(header === undefined)
        }

        void fetchUsp()
    }, [])

    if (header === undefined)
        return <Skeleton variant='rectangular' height={240} width='100%' />

    return (
        <Box
            component='header'
            sx={{
                backgroundColor: (theme) => theme.palette.grey[50],
                height: 240,
                overflow: 'hidden',
            }}
        >
            <Container>
                {notFound && (
                    <Typography variant='h1'>
                        Bizzkit CMS Starter Kit
                    </Typography>
                )}
                {!notFound && (
                    <BuilderComponent model='header' content={header} />
                )}
            </Container>
        </Box>
    )
}
