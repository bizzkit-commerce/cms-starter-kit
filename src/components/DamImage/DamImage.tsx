import { Box, useTheme } from '@mui/material'
import * as React from 'react'
import addPhotoIcon from '../../assets/add_photo_alternate.svg'
import { DamFile, getDamImageUrl } from '../../util/dam'

export type DamImageProps = React.PropsWithChildren<{
    readonly image?: null | DamFile
    readonly altText?: null | string
    readonly imageFit?: null | 'contain' | 'cover'
    readonly imagePosition?: null | {
        readonly x?: null | number
        readonly y?: null | number
    }
    readonly aspectRatio?: null | {
        readonly mobile?: null | number
        readonly tablet?: null | number
        readonly desktop?: null | number
    }
    readonly lazyLoad?: null | boolean
    // Builder's built-in attributes
    readonly attributes?: React.HTMLAttributes<HTMLImageElement>
}>

export const DamImage: React.FC<DamImageProps> = (props) => {
    const theme = useTheme()
    const { className: builderClassName, ...builderAttributes } =
        props.attributes ?? {}

    const imageProps: React.ImgHTMLAttributes<HTMLImageElement> =
        props.image === undefined || props.image === null
            ? {
                  src: addPhotoIcon,
                  alt: 'No image selected',
              }
            : {
                  // Using DAM's built-in transformation sizes for convenience:
                  // https://docs.bizzkit.com/dam/concepts/#transformations
                  srcSet: `
                      ${getDamImageUrl(props.image, '_small-preview')} ${theme.breakpoints.values.sm}w,
                      ${getDamImageUrl(props.image, '_medium-preview')} ${theme.breakpoints.values.md}w,
                      ${getDamImageUrl(props.image, '_large-preview')} ${theme.breakpoints.values.lg}w
                  `,
                  sizes: '100vw',
                  alt: props.altText ?? undefined,
              }

    const builderImageProps =
        props.children === undefined ? builderAttributes : {}

    const objectPositionX =
        typeof props.imagePosition?.x === 'number'
            ? `${props.imagePosition.x}%`
            : 'initial'

    const objectPositionY =
        typeof props.imagePosition?.y === 'number'
            ? `${props.imagePosition.y}%`
            : 'initial'

    const image = (
        <Box
            component='img'
            {...builderImageProps}
            {...imageProps}
            key={0}
            className={
                props.children === undefined ? builderClassName : undefined
            }
            loading={props.lazyLoad === true ? 'lazy' : undefined}
            sx={(theme) => ({
                width: '100%',
                aspectRatio: props.aspectRatio?.mobile,
                objectFit: props.imageFit ?? 'cover',
                objectPosition: `${objectPositionX} ${objectPositionY}`,
                [theme.breakpoints.up('md')]: {
                    aspectRatio: props.aspectRatio?.tablet,
                },
                [theme.breakpoints.up('lg')]: {
                    aspectRatio: props.aspectRatio?.desktop,
                },
            })}
        />
    )

    // Skip unnecessary container if no children are provided
    if (props.children === undefined) {
        return image
    }

    return (
        <Box
            component='figure'
            {...builderImageProps}
            key={0}
            className={builderClassName}
            sx={{
                position: 'relative',
                margin: 0,
                width: '100%',
            }}
        >
            {image}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                }}
            >
                {props.children}
            </Box>
        </Box>
    )
}
