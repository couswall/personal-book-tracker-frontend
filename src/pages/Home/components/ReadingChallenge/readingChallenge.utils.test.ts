import {afterEach, describe, expect, it, vi} from 'vitest';
import {
    RING_CIRCUMFERENCE,
    buildChallengeMessage,
    formatProjectedMonth,
    getRingOffset,
} from '@pages/Home/components/ReadingChallenge/readingChallenge.utils';
import {IChallengeProgress} from '@pages/Home/home.interfaces';

const baseProgress: IChallengeProgress = {
    remaining: 8,
    percentage: 60,
    expectedByNow: 15,
    status: 'ON_TRACK',
    booksAheadOrBehind: 0,
    booksPerMonthNeeded: 2,
    projectedFinishDate: null,
};

const build = (progress: Partial<IChallengeProgress>, booksThisMonth = 0, goal = 20) =>
    buildChallengeMessage({
        goal,
        booksThisMonth,
        progress: {...baseProgress, ...progress},
        locale: 'en-US',
    });

describe('buildChallengeMessage', () => {
    it('congratulates a COMPLETED challenge with the goal', () => {
        expect(build({status: 'COMPLETED'})).toBe('You reached your goal of 20 books!');
    });

    it('uses the singular for a goal of one book', () => {
        expect(build({status: 'COMPLETED'}, 0, 1)).toBe('You reached your goal of 1 book!');
    });

    it('encourages an AHEAD challenge', () => {
        expect(build({status: 'AHEAD', booksAheadOrBehind: 3})).toBe(
            "You're ahead of schedule! Keep it up!"
        );
    });

    it('reassures an ON_TRACK challenge', () => {
        expect(build({status: 'ON_TRACK'})).toBe("You're right on track.");
    });

    it('says how far behind a BEHIND challenge is and how to catch up', () => {
        expect(build({status: 'BEHIND', booksAheadOrBehind: -3, booksPerMonthNeeded: 2})).toBe(
            "You're 3 books behind. Read about 2 a month to catch up."
        );
    });

    it('uses the singular when one book behind', () => {
        expect(build({status: 'BEHIND', booksAheadOrBehind: -1, booksPerMonthNeeded: 1})).toBe(
            "You're 1 book behind. Read about 1 a month to catch up."
        );
    });

    it('rounds a fractional catch-up rate to one decimal', () => {
        expect(build({status: 'BEHIND', booksAheadOrBehind: -5, booksPerMonthNeeded: 1.6667})).toBe(
            "You're 5 books behind. Read about 1.7 a month to catch up."
        );
    });

    it('skips the catch-up advice when the year is over (booksPerMonthNeeded is null)', () => {
        expect(build({status: 'BEHIND', booksAheadOrBehind: -4, booksPerMonthNeeded: null})).toBe(
            "You're 4 books behind."
        );
    });

    it("adds this month's books when there are any", () => {
        expect(build({status: 'ON_TRACK'}, 1)).toBe(
            "You're right on track. You've read 1 book this month."
        );
        expect(build({status: 'ON_TRACK'}, 3)).toBe(
            "You're right on track. You've read 3 books this month."
        );
    });

    it('adds the projected finish month when there is one', () => {
        expect(build({status: 'AHEAD', projectedFinishDate: '2026-11-12T00:00:00.000Z'}, 3)).toBe(
            "You're ahead of schedule! Keep it up! You've read 3 books this month. You're on track to finish by November."
        );
    });
});

describe('formatProjectedMonth', () => {
    // Changing process.env.TZ mid-run isn't reliable in Vitest's worker threads (and CI runs in
    // UTC), so these tests never depend on the machine's time zone.
    const firstOfDecember = '2026-12-01T00:00:00.000Z';

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('shows why UTC matters: west of UTC, the first of the month is the previous month', () => {
        expect(
            new Date(firstOfDecember).toLocaleDateString('en-US', {
                month: 'long',
                timeZone: 'America/Los_Angeles',
            })
        ).toBe('November');
    });

    it('formats in UTC so the first of the month is not shown as the previous month', () => {
        const toLocaleDateString = vi.spyOn(Date.prototype, 'toLocaleDateString');

        expect(formatProjectedMonth(firstOfDecember, 'en-US')).toBe('December');
        expect(toLocaleDateString).toHaveBeenCalledWith(
            'en-US',
            expect.objectContaining({timeZone: 'UTC'})
        );
    });

    it('formats January 1st as January, not the previous December', () => {
        expect(formatProjectedMonth('2027-01-01T00:00:00.000Z', 'en-US')).toBe('January');
    });
});

describe('getRingOffset', () => {
    it('fills the ring proportionally', () => {
        expect(getRingOffset(0)).toBe(RING_CIRCUMFERENCE);
        expect(getRingOffset(50)).toBeCloseTo(RING_CIRCUMFERENCE / 2);
    });

    it('clamps percentages past 100 to a full ring', () => {
        expect(getRingOffset(110)).toBe(0);
    });
});
