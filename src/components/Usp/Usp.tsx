import { builder } from '@builder.io/react'
import { Box, Link, Skeleton } from '@mui/material'
import React from 'react'

interface UspModel {
    data: {
        items: {
            text: string
            link: string
        }[]
    }
}

export const Usp: React.FC = () => {
    const [usp, setUsp] = React.useState<UspModel | null>(null)

    React.useEffect(() => {
        async function fetchUsp(): Promise<void> {
            const usp = (await builder.get('usp').promise()) as UspModel

            setUsp(usp)
        }

        fetchUsp()
    }, [])

    if (usp === null)
        return <Skeleton variant='rectangular' height={36} width='100%' />

    if (usp === undefined || usp.data.items.length === 0) return null

    return (
        <Box
            component='section'
            role='banner'
            sx={{
                backgroundColor: (theme) => theme.palette.grey[200],
                display: 'flex',
                justifyContent: 'center',
                paddingY: 1,
            }}
        >
            <Box
                component='ul'
                sx={{
                    alignItems: 'center',
                    listStyle: 'none',
                    display: 'flex',
                    margin: 0,
                    gap: 8,
                }}
            >
                {usp.data.items.map((item, index) => (
                    <Box
                        component='li'
                        sx={{
                            display: 'flex',
                            textWrap: 'nowrap',
                        }}
                        key={index}
                    >
                        <Link
                            variant='body2'
                            href={item.link}
                            sx={{ textDecoration: 'none' }}
                        >
                            {item.text}
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
