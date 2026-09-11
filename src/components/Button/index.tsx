import {forwardRef} from 'react';
import {ButtonProps} from '@components/Button/buttonVariants';
import {StyledButton, ButtonSpinner, ButtonContent} from '@components/Button/StyledButton';

export type {ButtonProps} from '@components/Button/buttonVariants';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({loading, loadingText, leftIcon, rightIcon, disabled, children, ...props}, ref) => (
        <StyledButton ref={ref} disabled={disabled || loading} aria-busy={loading} {...props}>
            {loading ? (
                <ButtonContent>
                    <ButtonSpinner aria-hidden="true" />
                    {loadingText ?? children}
                </ButtonContent>
            ) : leftIcon || rightIcon ? (
                <ButtonContent>
                    {leftIcon}
                    {children}
                    {rightIcon}
                </ButtonContent>
            ) : (
                children
            )}
        </StyledButton>
    )
);

Button.displayName = 'Button';
