import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { BaseButton, BaseButtonTypes } from '../BaseButton';

import './Button.scss';

export interface ButtonProps {
    attention?: boolean;
    color?: 'primary' | 'secondary' | 'destructive';
    layout?: 'inline' | 'full';
    pending?: boolean;
    shadow?: boolean;
    size?: 'xlarge' | 'large' | 'medium' | 'small';
}

export type SolidButtonType = ButtonProps & BaseButtonTypes;

const Button = (props: SolidButtonType) => {
    const {
        attention,
        children,
        className,
        color = 'primary',
        layout = 'inline',
        pending,
        shadow = false,
        size = 'medium',
        ...rest
    } = props;

    const solidButtonClasses = classNames(
        className,
        'ds-solid-button',
        `ds-solid-button--${color}`,
        `ds-solid-button--${layout}`,
        `ds-solid-button--${size}`,
        {
            'ds-solid-button--disabled': props.as === 'button' && (props.disabled || pending),
            'ds-solid-button--pending': props.as === 'button' && pending,
            'ds-solid-button--shadow': shadow,
            'ds-solid-button--attention': attention && color === 'primary',
        }
    );

    return (
        <BaseButton
            className={solidButtonClasses}
            {...(props.as === 'button' ? { disabled: props.disabled || pending } : null)}
            {...rest}
        >
            {/* {props.as === 'button' && pending && (
                <FontAwesomeIcon icon={['fas', 'spinner']} size="1x" className="fa-spin-pulse" />
            )} */}
            {children}
        </BaseButton>
    );
};

export default Button;
