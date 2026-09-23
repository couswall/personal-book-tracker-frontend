import {ButtonProps} from '@components/index';

export type EmptyStateIconTone = 'primary' | 'secondary';

export interface IEmptyStateProps {
    iconClassName: string;
    iconTone?: EmptyStateIconTone;
    ringed?: boolean;
    title: string;
    description: string;
    buttonLabel: string;
    buttonIconClassName: string;
    buttonVariant?: ButtonProps['variant'];
    buttonFullWidth?: boolean;
}
