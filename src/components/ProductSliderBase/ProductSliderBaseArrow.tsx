import classNames from 'classnames'
import * as React from 'react'
import chevronLeftIcon from '../../assets/chevron_left.svg?raw'
import chevronRightIcon from '../../assets/chevron_right.svg?raw'
import styles from './ProductSliderBaseArrow.module.css'

export interface ProductSliderBaseArrowProps {
    readonly direction: 'left' | 'right'
    readonly disabled?: boolean
    readonly className?: string
    readonly onClick: () => void
}

export const ProductSliderBaseArrow: React.FC<ProductSliderBaseArrowProps> = ({
    direction,
    disabled = false,
    className,
    onClick,
}) => {
    return (
        <button
            type='button'
            disabled={disabled}
            className={classNames(
                styles['container'],
                styles[`arrow-${direction}`],
                className,
            )}
            onClick={onClick}
            dangerouslySetInnerHTML={{
                __html:
                    direction === 'left' ? chevronLeftIcon : chevronRightIcon,
            }}
        ></button>
    )
}
