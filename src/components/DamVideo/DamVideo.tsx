import { Box } from '@mui/material'
import * as React from 'react'
import { DamFile, getDamImageUrl, getDamVideoUrl } from '../../util/dam'

export type DamVideoProps = React.PropsWithChildren<{
    readonly video?: null | DamFile
    readonly description?: null | string
    readonly posterImage?: null | DamFile
    readonly autoPlay?: null | boolean
    readonly controls?: null | boolean
    readonly muted?: null | boolean
    readonly loop?: null | boolean
    readonly videoFit?: null | 'contain' | 'cover'
    readonly videoPosition?: null | {
        readonly x?: null | number
        readonly y?: null | number
    }
    readonly aspectRatio?: null | number
    // Builder's built-in attributes
    readonly attributes?: null | React.HTMLAttributes<HTMLVideoElement>
}>

export const DamVideo: React.FC<DamVideoProps> = (props) => {
    const { className: builderClassName, ...builderAttributes } =
        props.attributes ?? {}

    const videoUrl =
        props.video === undefined || props.video === null
            ? null
            : getDamVideoUrl(props.video)

    const objectPositionX =
        typeof props.videoPosition?.x === 'number'
            ? `${String(props.videoPosition.x)}%`
            : 'initial'

    const objectPositionY =
        typeof props.videoPosition?.y === 'number'
            ? `${String(props.videoPosition.y)}%`
            : 'initial'

    const video = (
        <Box
            component='video'
            {...builderAttributes}
            key={0}
            className={
                props.children === undefined ? builderClassName : undefined
            }
            aria-description={props.description ?? undefined}
            controls={props.controls ?? undefined}
            autoPlay={props.autoPlay ?? undefined}
            muted={props.muted ?? undefined}
            loop={props.loop ?? undefined}
            poster={
                props.posterImage === undefined || props.posterImage === null
                    ? undefined
                    : getDamImageUrl(props.posterImage, '_medium-preview')
            }
            sx={{
                width: '100%',
                aspectRatio: props.aspectRatio,
                objectFit: props.videoFit ?? 'cover',
                objectPosition: `${objectPositionX} ${objectPositionY}`,
            }}
        >
            {videoUrl !== null && (
                <>
                    <source src={videoUrl} type='video/mp4' />
                    <p>
                        Unsupported video. Click{' '}
                        <a href={videoUrl} download>
                            here
                        </a>{' '}
                        to download.
                    </p>
                </>
            )}
        </Box>
    )

    if (props.children === undefined) {
        return video
    }

    return (
        <Box
            component='figure'
            {...builderAttributes}
            key={0}
            className={builderClassName}
            sx={{
                position: 'relative',
                margin: 0,
                width: '100%',
            }}
        >
            {video}
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
