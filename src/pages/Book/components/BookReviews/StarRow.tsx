import * as S from '@pages/Book/components/BookReviews/bookReviews.styled';
import {IStarRowProps} from '@pages/Book/components/BookReviews/bookReviews.interfaces';

export const StarRow = ({count, filled = true}: IStarRowProps) => (
    <S.StarRating>
        {[...Array(5)].map((_, i) => (
            <i
                key={i}
                className={
                    i < count
                        ? 'fa-solid fa-star'
                        : filled
                          ? 'fa-regular fa-star'
                          : 'fa-solid fa-star'
                }
            ></i>
        ))}
    </S.StarRating>
);
