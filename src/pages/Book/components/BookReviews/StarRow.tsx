import * as S from '@pages/Book/components/BookReviews/bookReviews.styled';

export const StarRow = ({count, filled = true}: {count: number; filled?: boolean}) => (
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
