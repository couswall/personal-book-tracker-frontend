import styled from 'styled-components';
import {Icon} from '@components/Icon/index';

interface RatingStarsProps {
    rating: number;
    size?: string;
    $marginTop?: string;
}

const STAR_COUNT = 5;

type StarState = 'full' | 'half' | 'empty';

const STAR_ICON_CLASS: Record<StarState, string> = {
    full: 'fa-solid fa-star',
    half: 'fa-solid fa-star-half-stroke',
    empty: 'fa-regular fa-star',
};

const getStarStates = (rating: number): StarState[] => {
    const clampedRating = Math.max(0, Math.min(STAR_COUNT, rating));

    return Array.from({length: STAR_COUNT}, (_, index) => {
        const diff = clampedRating - index;
        if (diff >= 1) return 'full';
        if (diff >= 0.5) return 'half';
        return 'empty';
    });
};

const StarsRow = styled.div<{$marginTop?: string}>`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: ${(props) => props.$marginTop};
`;

export const RatingStars = ({rating, size = '1rem', $marginTop}: RatingStarsProps) => (
    <StarsRow $marginTop={$marginTop}>
        {getStarStates(rating).map((state, index) => (
            <Icon
                key={index}
                className={STAR_ICON_CLASS[state]}
                variant="primary"
                $fontSize={size}
            />
        ))}
    </StarsRow>
);
