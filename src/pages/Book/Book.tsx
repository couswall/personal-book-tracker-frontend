import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '@store/store';
import {
    BaseContainer,
    FlexContainer,
    GridContainer,
    Icon,
    LoadingSpinner,
    TitleH4,
} from '@components/index';
import {NoBookFound, BookReviews, BookSidebar, BookTopSection} from '@pages/Book/components/index';
import {AddToBookshelfModal} from '@pages/Book/components/AddToBookshelfModal/AddToBookshelfModal';
import * as S from '@pages/Book/Book.styled';
import {getBookById} from '@store/index';
import {getBookshelvesWithStatus} from '@pages/Book/Book.utils';
import {IBookshelfWithStatus} from '@pages/Book/Book.interfaces';

export const Book = () => {
    const {id} = useParams();
    const dispatch: AppDispatch = useDispatch();
    const {token, user} = useSelector((state: RootState) => state.auth);
    const {book, loading} = useSelector((state: RootState) => state.getBookById);
    const [showMoreDescription, setShowMoreDescription] = useState<boolean>(false);
    const [showAddToBookshelfModal, setShowAddToBookshelfModal] = useState<boolean>(false);
    const [bookshelves, setBookshelves] = useState<IBookshelfWithStatus[]>([]);

    useEffect(() => {
        if (!id || !token || !user) return;
        dispatch(getBookById({token, id}));
        getBookshelvesWithStatus({token, userId: user.id, apiBookId: id, setBookshelves});
    }, [id, token, dispatch, user]);

    if (loading) {
        return (
            <FlexContainer JustifyContent="center" AlignItems="center" MinHeight="100vh">
                <LoadingSpinner />
            </FlexContainer>
        );
    }

    if (!book) return <NoBookFound />;

    return (
        <S.LayoutContainer>
            <BookTopSection
                book={book}
                isOwned={bookshelves.some((shelf) => shelf.isSelected)}
                onOpenAddToBookshelfModal={() => setShowAddToBookshelfModal(true)}
            />

            {/* ── Bottom Section ── */}
            <GridContainer
                TemplateColumns="repeat(12, minmax(0, 1fr))"
                Gap="3rem"
                LgTemplateColumns="1fr"
                LgGap="2rem"
            >
                <FlexContainer
                    FlexDirection="column"
                    Gap="3rem"
                    GridColumn="span 8 / span 8"
                    LgGridColumn="unset"
                >
                    <BaseContainer as="section">
                        <TitleH4 MarginBottom="1rem">Description</TitleH4>
                        {book.description ? (
                            <>
                                <S.DescriptionText
                                    $showMore={showMoreDescription}
                                    dangerouslySetInnerHTML={{__html: book.description}}
                                />
                                <S.ShowMoreBtn
                                    onClick={() => setShowMoreDescription(!showMoreDescription)}
                                >
                                    {showMoreDescription ? 'Show less' : 'Show more'}
                                    <Icon
                                        FontColor="inherit"
                                        className={
                                            showMoreDescription
                                                ? 'fa-solid fa-chevron-up'
                                                : 'fa-solid fa-chevron-down'
                                        }
                                    />
                                </S.ShowMoreBtn>
                            </>
                        ) : (
                            <S.DescriptionText $showMore={true}>
                                No description available.
                            </S.DescriptionText>
                        )}
                    </BaseContainer>

                    <BookReviews />
                </FlexContainer>

                <BaseContainer GridColumn="span 4 / span 4" LgGridColumn="unset">
                    <BookSidebar />
                </BaseContainer>
            </GridContainer>
            <AddToBookshelfModal
                isOpen={showAddToBookshelfModal}
                onCloseModal={() => setShowAddToBookshelfModal(false)}
                bookshelves={bookshelves}
            />
        </S.LayoutContainer>
    );
};
