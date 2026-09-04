import React, {forwardRef} from 'react';
import {
    ToggleSwitchInput,
    ToggleSwitchTrack,
    ToggleSwitchWrapper,
} from '@components/ToggleSwitch/index';

export interface IToggleSwitchProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const ToggleSwitch = forwardRef<HTMLInputElement, IToggleSwitchProps>(
    ({checked, onChange, ...props}, ref) => (
        <ToggleSwitchWrapper>
            <ToggleSwitchInput
                ref={ref}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                {...props}
            />
            <ToggleSwitchTrack />
        </ToggleSwitchWrapper>
    )
);

ToggleSwitch.displayName = 'ToggleSwitch';
