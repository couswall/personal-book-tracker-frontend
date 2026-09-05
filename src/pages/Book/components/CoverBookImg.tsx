import React from 'react';
import {FlexContainer, Image, Paragraph} from '@components/index';
import {ICoverBookImgProps} from '@pages/Book/components/book.components.interfaces';
import {NO_IMAGE_AVAILABLE} from '@pages/Book/components/book.components.constants';

export const CoverBookImg: React.FC<ICoverBookImgProps> = ({
    imgSrc,
    width = '220px',
    height = '280px',
    flex,
    onClick,
    cursor = 'default',
}) => {
    return (
        <FlexContainer
            BorderRadius="0.5rem"
            Overflow="hidden"
            Width={width}
            Height={height}
            Flex={flex}
            onClick={() => onClick?.()}
            Cursor={cursor}
        >
            {imgSrc ? (
                <Image src={imgSrc} Width="100%" Height="100%" ObjectFit="fill" />
            ) : (
                <FlexContainer
                    Width="100%"
                    Height="100%"
                    JustifyContent="center"
                    AlignItems="center"
                >
                    <Paragraph>{NO_IMAGE_AVAILABLE}</Paragraph>
                </FlexContainer>
            )}
        </FlexContainer>
    );
};
