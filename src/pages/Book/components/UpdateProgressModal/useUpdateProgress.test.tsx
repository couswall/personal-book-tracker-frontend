import {beforeEach, describe, expect, it, vi} from 'vitest';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Controller} from 'react-hook-form';
import {ToggleSwitch} from '@components/ToggleSwitch/ToggleSwitch';
import {useUpdateProgress} from '@pages/Book/components/UpdateProgressModal/useUpdateProgress';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';
import {UPDATE_PROGRESS_TEXTS} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';
import {IUseUpdateProgressParams} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';
import * as progressApi from '@pages/Book/components/UpdateProgressModal/updateProgressModal.api';

vi.mock('@pages/Book/components/UpdateProgressModal/updateProgressModal.api');

const onRefresh = vi.fn().mockResolvedValue(undefined);

const defaultProps: IUseUpdateProgressParams = {
    token: 'tok',
    bookshelfBookId: 10,
    totalPages: 400,
    initialCurrentPage: 100,
    initialReadingProgress: 25,
    isOpen: true,
    onRefresh,
};

const Harness = (props: IUseUpdateProgressParams) => {
    const {
        hasPageCount,
        inputMethod,
        switchInputMethod,
        currentPage,
        percentage,
        isLoading,
        alert,
        valueField,
        control,
        submit,
    } = useUpdateProgress(props);

    return (
        <div>
            <span data-testid="has-page-count">{String(hasPageCount)}</span>
            <span data-testid="input-method">{inputMethod}</span>
            <span data-testid="current-page">{currentPage}</span>
            <span data-testid="percentage">{percentage}</span>
            <span data-testid="is-loading">{String(isLoading)}</span>
            <span data-testid="alert-message">{alert.message}</span>
            <span data-testid="alert-variant">{alert.variant}</span>
            <label htmlFor="value">value</label>
            <input id="value" type="number" {...valueField} />
            <Controller
                name="isFinished"
                control={control}
                render={({field: {value, onChange, name, ref}}) => (
                    <ToggleSwitch
                        aria-label="finished"
                        checked={value}
                        onChange={onChange}
                        name={name}
                        ref={ref}
                    />
                )}
            />
            <button onClick={() => switchInputMethod('PERCENTAGE')}>Switch to percentage</button>
            <button onClick={() => switchInputMethod('PAGE')}>Switch to pages</button>
            <button onClick={() => submit()}>Save</button>
        </div>
    );
};

describe('useUpdateProgress', () => {
    beforeEach(() => {
        vi.mocked(progressApi.updateReadingProgress).mockReset();
    });

    it('defaults to the PAGE input method when the book has a page count', () => {
        renderWithProviders(<Harness {...defaultProps} />);

        expect(screen.getByTestId('has-page-count')).toHaveTextContent('true');
        expect(screen.getByTestId('input-method')).toHaveTextContent('PAGE');
        expect(screen.getByLabelText('value')).toHaveValue(100);
    });

    it('defaults to the PERCENTAGE input method when the book has no page count', () => {
        renderWithProviders(<Harness {...defaultProps} totalPages={0} />);

        expect(screen.getByTestId('has-page-count')).toHaveTextContent('false');
        expect(screen.getByTestId('input-method')).toHaveTextContent('PERCENTAGE');
        expect(screen.getByLabelText('value')).toHaveValue(25);
    });

    it('switches the input method and preloads the value for that method', async () => {
        renderWithProviders(<Harness {...defaultProps} />);
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: 'Switch to percentage'}));

        expect(screen.getByTestId('input-method')).toHaveTextContent('PERCENTAGE');
        expect(screen.getByLabelText('value')).toHaveValue(25);
    });

    it('submits the current value and shows a success alert', async () => {
        vi.mocked(progressApi.updateReadingProgress).mockResolvedValue({
            id: 1,
            bookshelfId: 2,
            bookId: 3,
            readingProgress: 40,
            currentPage: 160,
            totalPages: 400,
        });
        renderWithProviders(<Harness {...defaultProps} />);
        const user = userEvent.setup();

        await user.clear(screen.getByLabelText('value'));
        await user.type(screen.getByLabelText('value'), '160');
        await user.click(screen.getByRole('button', {name: 'Save'}));

        expect(progressApi.updateReadingProgress).toHaveBeenCalledWith({
            token: 'tok',
            bookshelfBookId: 10,
            progressType: 'PAGE',
            value: 160,
            isFinished: false,
            onSuccess: onRefresh,
        });
        expect(await screen.findByTestId('alert-message')).toHaveTextContent(
            UPDATE_PROGRESS_TEXTS.PROGRESS_UPDATED
        );
        expect(screen.getByTestId('alert-variant')).toHaveTextContent('success');
        expect(screen.getByTestId('current-page')).toHaveTextContent('160');
        expect(screen.getByTestId('percentage')).toHaveTextContent('40');
    });

    it('shows a danger alert when the update fails', async () => {
        vi.mocked(progressApi.updateReadingProgress).mockRejectedValue(new Error('Network error'));
        renderWithProviders(<Harness {...defaultProps} />);
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: 'Save'}));

        expect(await screen.findByTestId('alert-message')).toHaveTextContent('Network error');
        expect(screen.getByTestId('alert-variant')).toHaveTextContent('danger');
    });

    it('sends 0 when the value field is cleared to an empty/NaN value', async () => {
        vi.mocked(progressApi.updateReadingProgress).mockResolvedValue({
            id: 1,
            bookshelfId: 2,
            bookId: 3,
            readingProgress: 0,
            currentPage: 0,
            totalPages: 400,
        });
        renderWithProviders(<Harness {...defaultProps} />);
        const user = userEvent.setup();

        await user.clear(screen.getByLabelText('value'));
        await user.click(screen.getByRole('button', {name: 'Save'}));

        expect(progressApi.updateReadingProgress).toHaveBeenCalledWith(
            expect.objectContaining({value: 0})
        );
    });

    it('sends isFinished: true when the finished toggle is checked', async () => {
        vi.mocked(progressApi.updateReadingProgress).mockResolvedValue({
            id: 1,
            bookshelfId: 2,
            bookId: 3,
            readingProgress: 100,
            currentPage: 400,
            totalPages: 400,
        });
        renderWithProviders(<Harness {...defaultProps} />);
        const user = userEvent.setup();

        expect(screen.getByRole('checkbox', {name: 'finished'})).not.toBeChecked();

        await user.click(screen.getByRole('checkbox', {name: 'finished'}));
        expect(screen.getByRole('checkbox', {name: 'finished'})).toBeChecked();

        await user.click(screen.getByRole('button', {name: 'Save'}));

        expect(progressApi.updateReadingProgress).toHaveBeenCalledWith(
            expect.objectContaining({isFinished: true})
        );
    });

    it('does not submit when there is no token or bookshelfBookId', async () => {
        renderWithProviders(
            <Harness {...defaultProps} token={undefined} bookshelfBookId={undefined} />
        );
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: 'Save'}));

        expect(progressApi.updateReadingProgress).not.toHaveBeenCalled();
    });
});
