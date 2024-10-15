import classNames from 'classnames'
import * as React from 'react'
import brokenImageIcon from '../../assets/broken_image.svg'
import photoIcon from '../../assets/photo.svg'
import styles from './ProductCardBase.module.css'
import { ProductCardBaseSkeleton } from './ProductCardBaseSkeleton'

export interface ProductCardBase {
    readonly loading?: boolean
    readonly title?: string
    readonly imageUrl?: string
    readonly stock?: number
    readonly price?: number
    readonly className?: string
}

export const ProductCardBase: React.FC<ProductCardBase> = ({
    loading = false,
    title = 'Unknown',
    imageUrl = photoIcon,
    stock = 0,
    price,
    className,
}) => {
    const [actualImageUrl, setActualImageUrl] = React.useState<string>(imageUrl)

    const onImageError = React.useCallback((): void => {
        setActualImageUrl(brokenImageIcon)
    }, [])

    React.useEffect(() => {
        setActualImageUrl(imageUrl)
    }, [imageUrl])

    if (loading) {
        return <ProductCardBaseSkeleton className={className} />
    }

    return (
        <article className={classNames(styles['container'], className)}>
            <div
                className={classNames(styles['stock'], {
                    [styles['in-stock'] ?? '']: stock > 0,
                    [styles['low-stock'] ?? '']: stock < 10,
                    [styles['sold-out'] ?? '']: stock === 0,
                })}
            >
                {stock === 0
                    ? 'Sold out'
                    : stock > 10
                      ? 'In stock'
                      : 'Few remaining'}
            </div>
            <img
                className={styles['image']}
                src={actualImageUrl}
                alt={title}
                onError={onImageError}
            />
            <div className={styles['label']}>
                <header className={styles['title']}>{title}</header>
                {price !== undefined && (
                    <p>
                        from{' '}
                        <strong>
                            {/* Search price decimals are reported as integer */}
                            {priceFormat.format(price / 100)}
                        </strong>
                    </p>
                )}
            </div>
        </article>
    )
}

const priceFormat = Intl.NumberFormat(navigator.languages, {
    currency: 'EUR',
    style: 'currency',
})
