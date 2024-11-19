import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import {
    Card,
    CardContent,
    CardMedia,
    Skeleton,
    SxProps,
    Theme,
    Typography,
} from '@mui/material'
import * as React from 'react'
import brokenImageIcon from '../../assets/broken_image.svg'
import photoIcon from '../../assets/photo.svg'

export interface ProductCardBase {
    readonly loading?: boolean
    readonly title?: string
    readonly imageUrl?: string
    readonly stock?: number
    readonly price?: number
    readonly sx?: SxProps<Theme>
}

export const ProductCardBase: React.FC<ProductCardBase> = ({
    loading = false,
    title = 'Unknown',
    imageUrl = photoIcon,
    stock = 0,
    price,
    sx,
}) => {
    const [actualImageUrl, setActualImageUrl] = React.useState<string>(imageUrl)

    const onImageError = React.useCallback((): void => {
        setActualImageUrl(brokenImageIcon)
    }, [])

    React.useEffect(() => {
        setActualImageUrl(imageUrl)
    }, [imageUrl])

    if (loading) {
        return (
            <Card sx={sx}>
                <CardMedia>
                    <Skeleton
                        variant='rectangular'
                        height='auto'
                        width='100%'
                        sx={{ aspectRatio: 1 }}
                    />
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        <Skeleton />
                    </Typography>
                    <Typography variant='body1' component='div'>
                        <Skeleton />
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    const stockLabel =
        stock === 0 ? 'Sold out' : stock > 10 ? 'In stock' : 'Few remaining'

    return (
        <Card sx={sx}>
            <CardMedia
                title={title}
                image={actualImageUrl}
                onError={onImageError}
                sx={{
                    aspectRatio: 1,
                    backgroundColor: (theme) => theme.palette.grey[50],
                    objectFit: 'contain',
                }}
            >
                <Typography component='div' variant='subtitle2' sx={{ p: 2 }}>
                    <RadioButtonCheckedIcon
                        color={
                            stock === 0
                                ? 'error'
                                : stock < 10
                                  ? 'warning'
                                  : 'success'
                        }
                        sx={{
                            verticalAlign: 'bottom',
                        }}
                    />{' '}
                    {stockLabel}
                </Typography>
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {title}
                </Typography>
                {price !== undefined && (
                    <Typography
                        variant='body1'
                        sx={{ color: 'text.secondary' }}
                    >
                        from <strong>{priceFormat.format(price / 200)}</strong>
                    </Typography>
                )}
            </CardContent>
        </Card>
    )
}

const priceFormat = Intl.NumberFormat(navigator.languages, {
    currency: 'EUR',
    style: 'currency',
})
