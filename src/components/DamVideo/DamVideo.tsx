import classNames from 'classnames'
import * as React from 'react'
import { DamFile, getDamImageUrl, getDamVideoUrl } from '../../util/dam'
import styles from './DamVideo.module.css'

export type DamVideoProps = React.PropsWithChildren<{
    readonly video?: null | DamFile
    readonly posterImage?: null | DamFile
    readonly autoPlay?: null | boolean
    readonly controls?: null | boolean
    readonly muted?: null | boolean
    readonly loop?: null | boolean
    readonly videoFit?: null | string
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

    const videoClassNames =
        props.children === undefined
            ? classNames(builderClassName, styles['video'])
            : classNames(styles['video'])

    const video = (
        <video
            {...builderAttributes}
            key={0}
            className={videoClassNames}
            controls={props.controls ?? undefined}
            autoPlay={props.autoPlay ?? undefined}
            muted={props.muted ?? undefined}
            loop={props.loop ?? undefined}
            poster={
                props.posterImage === undefined || props.posterImage === null
                    ? undefined
                    : getDamImageUrl(props.posterImage, '_medium-preview')
            }
            style={
                {
                    '--object-fit': props.videoFit,
                    '--object-position-x':
                        typeof props.videoPosition?.x === 'number'
                            ? `${props.videoPosition.x}%`
                            : undefined,
                    '--object-position-y':
                        typeof props.videoPosition?.y === 'number'
                            ? `${props.videoPosition.y}%`
                            : undefined,
                    '--aspect-ratio': props.aspectRatio,
                } as React.CSSProperties
            }
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
        </video>
    )

    if (props.children === undefined) {
        return video
    }

    return (
        <figure
            {...builderAttributes}
            key={0}
            className={classNames(builderClassName, styles['container'])}
        >
            {video}
            <div className={styles['children']}>{props.children}</div>
        </figure>
    )
}
