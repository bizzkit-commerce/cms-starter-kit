import classNames from 'classnames'
import * as React from 'react'
import styles from './Skeleton.module.css'

export interface SkeletonProps {
    readonly className?: string
    readonly width?: string
    readonly height?: string
}

export const Skeleton: React.FC<SkeletonProps> = (props) => {
    return (
        <span
            className={classNames(styles['skeleton'], props.className)}
            style={
                {
                    '--width': props.width ?? undefined,
                    '--height': props.height ?? undefined,
                } as React.CSSProperties
            }
        />
    )
}
