import classNames from 'classnames'
import * as React from 'react'
import styles from './IconButton.module.css'

export interface IconButtonProps {
    readonly icon: string
    readonly label: string
    readonly disabled?: boolean
    readonly className?: string
    readonly onClick?: () => void
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    label,
    disabled = false,
    className,
    onClick,
}) => {
    return (
        <button
            type='button'
            disabled={disabled}
            className={classNames(styles['container'], className)}
            aria-label={label}
            onClick={onClick}
            dangerouslySetInnerHTML={{
                __html: icon,
            }}
        ></button>
    )
}
