import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {useCallback, useEffect, useState} from 'react';
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
import {UpdateProgressModal} from '@pages/Book/components/UpdateProgressModal/UpdateProgressModal';
import * as S from '@pages/Book/book.styled';
import {getBookById} from '@store/index';
import {getBookshelvesWithStatus} from '@pages/Book/book.api';
import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';
import {BOOK_TEXTS} from '@pages/Book/book.constants';

export const Book = () => {
    const {id} = useParams();
    const dispatch: AppDispatch = useDispatch();
    const {token, user} = useSelector((state: RootState) => state.auth);
    const {book, loading} = useSelector((state: RootState) => state.getBookById);
    const [showMoreDescription, setShowMoreDescription] = useState<boolean>(false);
    const [showAddToBookshelfModal, setShowAddToBookshelfModal] = useState<boolean>(false);
    const [showUpdateProgressModal, setShowUpdateProgressModal] = useState<boolean>(false);
    const [bookshelves, setBookshelves] = useState<IBookshelfWithStatus[]>([]);

    const selectedBookshelf = bookshelves.find((shelf) => shelf.isSelected);

    const handleRefresh = useCallback(() => {
        if (!token || !user || !id) return Promise.resolve();
        return getBookshelvesWithStatus({token, userId: user.id, apiBookId: id, setBookshelves});
    }, [token, user, id]);

    useEffect(() => {
        if (!id || !token || !user) return;
        dispatch(getBookById({token, id}));
        getBookshelvesWithStatus({token, userId: user.id, apiBookId: id, setBookshelves});
    }, [id, token, dispatch, user]);

    if (loading) {
        return (
            <FlexContainer $justifyContent="center" $alignItems="center" $minHeight="100vh">
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
                onUpdateProgress={() => setShowUpdateProgressModal(true)}
                bookshelfLabel={selectedBookshelf?.name}
                progressPercentage={selectedBookshelf?.readingProgress ?? undefined}
            />

            {/* ── Bottom Section ── */}
            <GridContainer
                $templateColumns="repeat(12, minmax(0, 1fr))"
                $gap="3rem"
                $lgTemplateColumns="1fr"
                $lgGap="2rem"
            >
                <FlexContainer
                    $flexDirection="column"
                    $gap="3rem"
                    $gridColumn="span 8 / span 8"
                    $lgGridColumn="unset"
                >
                    <BaseContainer as="section">
                        <TitleH4 $marginBottom="1rem">{BOOK_TEXTS.DESCRIPTION_TITLE}</TitleH4>
                        {book.description ? (
                            <>
                                <S.DescriptionText
                                    $showMore={showMoreDescription}
                                    dangerouslySetInnerHTML={{__html: book.description}}
                                />
                                <S.ShowMoreBtn
                                    onClick={() => setShowMoreDescription(!showMoreDescription)}
                                >
                                    {showMoreDescription
                                        ? BOOK_TEXTS.SHOW_LESS
                                        : BOOK_TEXTS.SHOW_MORE}
                                    <Icon
                                        $fontColor="inherit"
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
                                {BOOK_TEXTS.NO_DESCRIPTION}
                            </S.DescriptionText>
                        )}
                    </BaseContainer>

                    <BookReviews />
                </FlexContainer>

                <BaseContainer $gridColumn="span 4 / span 4" $lgGridColumn="unset">
                    <BookSidebar />
                </BaseContainer>
            </GridContainer>
            <AddToBookshelfModal
                isOpen={showAddToBookshelfModal}
                onCloseModal={() => setShowAddToBookshelfModal(false)}
                bookshelves={bookshelves}
                bookId={id}
                token={token}
                onRefresh={handleRefresh}
            />
            <UpdateProgressModal
                isOpen={showUpdateProgressModal}
                onCloseModal={() => setShowUpdateProgressModal(false)}
                bookTitle={book.title}
                totalPages={book.pageCount}
                bookshelfBookId={selectedBookshelf?.bookshelfBookId ?? undefined}
                currentPage={selectedBookshelf?.currentPage ?? null}
                readingProgress={selectedBookshelf?.readingProgress ?? null}
                token={token}
                onRefresh={handleRefresh}
            />
        </S.LayoutContainer>
    );
};
