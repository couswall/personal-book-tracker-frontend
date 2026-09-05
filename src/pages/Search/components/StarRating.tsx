import {StarContainer, StarFill, StarWrapper} from '@pages/Search/components/starRating.styled';
import {IStarRatingProps} from '@pages/Search/components/search.components.interfaces';

export const StarRating: React.FC<IStarRatingProps> = ({rating, size = '1rem'}) => {
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
