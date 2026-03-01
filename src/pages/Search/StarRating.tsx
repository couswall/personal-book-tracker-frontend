import {StarContainer, StarFill, StarWrapper} from '@pages/Search/styles';

interface StarRatingProps {
    rating: number;
    size?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({rating, size = '1rem'}) => {
    const clampedRating = Math.max(0, Math.min(5, rating));

    return (
        <StarContainer $size={size}>
            {[1, 2, 3, 4, 5].map((star) => {
                const fillPercent = Math.max(0, Math.min(100, (clampedRating - star + 1) * 100));
                return (
                    <StarWrapper key={star}>
                        <span>★</span>
                        <StarFill $fillPercent={fillPercent}>★</StarFill>
                    </StarWrapper>
                );
            })}
        </StarContainer>
    );
};
