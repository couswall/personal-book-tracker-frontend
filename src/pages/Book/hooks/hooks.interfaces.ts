export type AlertVariant = 'success' | 'danger';

export interface IAlertState {
    message: string;
    variant: AlertVariant;
    visible: boolean;
}
