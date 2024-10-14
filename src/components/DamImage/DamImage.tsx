import classNames from 'classnames'
import * as React from 'react'
import addPhotoIcon from '../../assets/add_photo_alternate.svg'
import { DamFile, getDamImageUrl } from '../../util/dam'
import styles from './DamImage.module.css'

export type DamImageProps = React.PropsWithChildren<{
    readonly image?: null | DamFile
    readonly altText?: null | string
    readonly imageFit?: string
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
    const { className: builderClassName, ...builderAttributes } =
        props.attributes ?? {}

    const aspectRatioClassNames = {
        [styles['mobile-aspect-ratio'] ?? '']:
            typeof props.aspectRatio?.mobile === 'number',
        [styles['tablet-aspect-ratio'] ?? '']:
            typeof props.aspectRatio?.tablet === 'number',
        [styles['desktop-aspect-ratio'] ?? '']:
            typeof props.aspectRatio?.desktop === 'number',
    }

    const imageProps: React.HTMLProps<HTMLImageElement> =
        props.image === undefined || props.image === null
            ? {
                  src: addPhotoIcon,
                  alt: 'No image selected',
              }
            : {
                  // Using DAM's built-in transformation sizes for convenience:
                  // https://docs.bizzkit.com/dam/concepts/#transformations
                  srcSet: `
                      ${getDamImageUrl(props.image, '_small-preview')} 350w,
                      ${getDamImageUrl(props.image, '_medium-preview')} 720w,
                      ${getDamImageUrl(props.image, '_large-preview')} 1600w
                  `,
                  sizes: '100vw',
                  alt: props.altText ?? undefined,
              }

    const builderImageProps =
        props.children === undefined ? builderAttributes : {}

    const imageClassNames =
        props.children === undefined
            ? classNames(
                  builderClassName,
                  styles['image'],
                  aspectRatioClassNames,
              )
            : classNames(styles['image'], aspectRatioClassNames)

    const image = (
        <img
            {...builderImageProps}
            {...imageProps}
            key={0}
            className={imageClassNames}
            loading={props.lazyLoad === true ? 'lazy' : undefined}
            style={
                {
                    '--object-fit': props.imageFit,
                    '--object-position-x':
                        typeof props.imagePosition?.x === 'number'
                            ? `${props.imagePosition.x}%`
                            : undefined,
                    '--object-position-y':
                        typeof props.imagePosition?.y === 'number'
                            ? `${props.imagePosition.y}%`
                            : undefined,
                    '--mobile-aspect-ratio': props.aspectRatio?.mobile,
                    '--tablet-aspect-ratio': props.aspectRatio?.tablet,
                    '--desktop-aspect-ratio': props.aspectRatio?.desktop,
                } as React.CSSProperties
            }
        />
    )

    // Skip unnecessary container if no children are provided
    if (props.children === undefined) {
        return image
    }

    return (
        <figure
            {...builderImageProps}
            key={0}
            className={classNames(builderClassName, styles['container'])}
        >
            {image}
            <div className={styles['children']}>{props.children}</div>
        </figure>
    )
}
