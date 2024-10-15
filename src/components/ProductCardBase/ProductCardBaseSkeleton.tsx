import classNames from 'classnames'
import * as React from 'react'
import { Skeleton } from '../Skeleton'
import styles from './ProductCardBaseSkeleton.module.css'

export interface ProductCardBaseSkeletonProps {
    readonly className?: string
}

export const ProductCardBaseSkeleton: React.FC<
    ProductCardBaseSkeletonProps
> = ({ className }) => {
    return (
        <article className={classNames(styles['container'], className)}>
            <Skeleton className={styles['image-skeleton']} />
            <Skeleton className={styles['label-skeleton']} />
        </article>
    )
}
