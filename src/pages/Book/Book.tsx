import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '@store/store';
import {getBookById} from '@store/index';
import {
    ButtonSecondary,
    ButtonTransparent,
    FlexContainer,
    Icon,
    LoadingSpinner,
    Paragraph,
    TitleH1,
    TitleH3,
} from '@components/index';
import {CoverBookImg, NoBookFound} from '@pages/Book/components/index';
import {formatIsoDate} from '@pages/Book/Book.utils';

export const Book = () => {
    const {id} = useParams();
    const dispatch: AppDispatch = useDispatch();
    const {token} = useSelector((state: RootState) => state.auth);
    const {book, loading} = useSelector((state: RootState) => state.getBookById);
    const [showMoreDescription, setShowMorDescription] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        dispatch(getBookById({token, id}));
    }, [id]);

    if (loading) {
        return (
            <FlexContainer JustifyContent="center" AlignItems="center" MinHeight="100vh">
                <LoadingSpinner />
            </FlexContainer>
        );
    }

    if (!book) {
        return <NoBookFound />;
    }

    return (
        <FlexContainer
            MinHeight="100vh"
            MaxWidth="1400px"
            Margin="0px auto"
            Padding="40px"
            Gap="1.5rem"
        >
            {/* SIDEBAR IMAGE */}
            <FlexContainer Gap="32px" Width="350px">
                <FlexContainer
                    FlexDirection="column"
                    Gap="1.5rem"
                    AlignItems="center"
                    JustifyContent="start"
                    Width="100%"
                >
                    <CoverBookImg imgSrc={book.coverImageUrl} />
                    <ButtonSecondary Width="100%">{'Want to read'}</ButtonSecondary>
                </FlexContainer>
            </FlexContainer>
            {/* BOOK INFORMATION */}
            <FlexContainer FlexDirection="column" Width="100%" Gap="1rem">
                <FlexContainer FlexDirection="column">
                    <TitleH1 FontSize="2rem">{book?.title}</TitleH1>
                    {book.authors.map((author, index) => (
                        <TitleH3 key={index} FontWeight="300" FontSize="1.25rem" FontStyle="italic">
                            {author}
                        </TitleH3>
                    ))}
                </FlexContainer>
                <FlexContainer AlignItems="center" Gap="0.5rem">
                    <Paragraph FontSize="1.5rem">{book.averageRating}</Paragraph>
                    <Paragraph size="sm">{`${book.reviewCount} reviews`}</Paragraph>
                </FlexContainer>
                <FlexContainer FlexDirection="column" Gap="1.25rem" Width="100%">
                    {book.subtitle && <Paragraph FontWeight="500">{book.subtitle}</Paragraph>}
                    {book.description && (
                        <FlexContainer FlexDirection="column" Gap="0.5rem">
                            <FlexContainer
                                Position="relative"
                                MaxHeight={showMoreDescription ? 'none' : '100px'}
                                Overflow="hidden"
                            >
                                <Paragraph
                                    dangerouslySetInnerHTML={{__html: book.description}}
                                    FontSize="0.875rem"
                                />
                                {!showMoreDescription && (
                                    <FlexContainer
                                        Position="absolute"
                                        Top="95px"
                                        Width="100%"
                                        Height="16px"
                                        Filter="blur(4px)"
                                    />
                                )}
                            </FlexContainer>
                            <ButtonTransparent
                                Width="fit-content"
                                HBackGColor="transparent"
                                onClick={() => setShowMorDescription(!showMoreDescription)}
                                Padding="0"
                                FontWeight="500"
                                HTextDecoration="underline"
                                FontSize="0.875rem"
                            >
                                {showMoreDescription ? 'Show Less' : 'Show More'}
                                <Icon
                                    FontColor="inherit"
                                    MarginLeft="0.5rem"
                                    className={
                                        showMoreDescription
                                            ? 'fa-solid fa-chevron-up'
                                            : 'fa-solid fa-chevron-down'
                                    }
                                />
                            </ButtonTransparent>
                        </FlexContainer>
                    )}
                </FlexContainer>
                {book.categories.length > 0 && (
                    <FlexContainer Gap="0.5rem" AlignItems="start">
                        <Paragraph size="sm" variant="muted">
                            {'Categories: '}
                        </Paragraph>
                        <FlexContainer FlexWrap="wrap" Gap="1rem">
                            {book.categories.map((category, index) => (
                                <Paragraph
                                    key={index}
                                    TextDecoration="underline"
                                    FontWeight="500"
                                    FontSize="1rem"
                                >
                                    {category}
                                </Paragraph>
                            ))}
                        </FlexContainer>
                    </FlexContainer>
                )}
                <Paragraph size="sm" variant="muted">
                    {`${book.pageCount} pages`}
                </Paragraph>
                {book.publishedDate && (
                    <Paragraph size="sm" variant="muted">
                        {`Published on ${formatIsoDate(book.publishedDate)}`}
                    </Paragraph>
                )}
            </FlexContainer>
        </FlexContainer>
    );
};
