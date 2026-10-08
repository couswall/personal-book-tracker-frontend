import {CHALLENGE_MESSAGES} from '@pages/Home/home.constants';
import {IChallengeProgress} from '@pages/Home/home.interfaces';

const RING_RADIUS = 40;

export const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** The percentage can go past 100; only the ring is clamped. */
export const getRingOffset = (percentage: number): number => {
    const ratio = Math.min(Math.max(percentage, 0), 100) / 100;
    return RING_CIRCUMFERENCE * (1 - ratio);
};

/**
 * Month name of an ISO date stored at UTC midnight. Formatting in UTC matters: in a time zone
 * west of UTC, "2026-12-01T00:00:00.000Z" is still November 30th locally.
 */
export const formatProjectedMonth = (isoDate: string, locale?: string): string =>
    new Date(isoDate).toLocaleDateString(locale, {month: 'long', timeZone: 'UTC'});

const formatBooksPerMonth = (value: number, locale?: string): string =>
    value.toLocaleString(locale, {maximumFractionDigits: 1});

const getStatusSentence = (goal: number, progress: IChallengeProgress, locale?: string) => {
    switch (progress.status) {
        case 'COMPLETED':
            return CHALLENGE_MESSAGES.COMPLETED(goal);
        case 'AHEAD':
            return CHALLENGE_MESSAGES.AHEAD;
        case 'ON_TRACK':
            return CHALLENGE_MESSAGES.ON_TRACK;
        case 'BEHIND': {
            const behind = CHALLENGE_MESSAGES.BEHIND(Math.abs(progress.booksAheadOrBehind));
            if (progress.booksPerMonthNeeded === null) return behind;
            const perMonth = formatBooksPerMonth(progress.booksPerMonthNeeded, locale);
            return `${behind} ${CHALLENGE_MESSAGES.CATCH_UP(perMonth)}`;
        }
    }
};

interface IBuildChallengeMessageParams {
    goal: number;
    booksThisMonth: number;
    progress: IChallengeProgress;
    /** Defaults to the browser's locale; tests pin it. */
    locale?: string;
}

/** Builds the motivational sentence from the API's facts, skipping any part without data. */
export const buildChallengeMessage = ({
    goal,
    booksThisMonth,
    progress,
    locale,
}: IBuildChallengeMessageParams): string => {
    const parts = [getStatusSentence(goal, progress, locale)];
    if (booksThisMonth > 0) parts.push(CHALLENGE_MESSAGES.THIS_MONTH(booksThisMonth));
    if (progress.projectedFinishDate !== null) {
        const month = formatProjectedMonth(progress.projectedFinishDate, locale);
        parts.push(CHALLENGE_MESSAGES.FINISH_BY(month));
    }
    return parts.join(' ');
};
