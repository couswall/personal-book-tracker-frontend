const RING_RADIUS = 40;

export const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export const getRingOffset = (current: number, goal: number): number => {
    const ratio = goal > 0 ? Math.min(current / goal, 1) : 0;
    return RING_CIRCUMFERENCE * (1 - ratio);
};
