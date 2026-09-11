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
            $borderRadius="0.5rem"
            $overflow="hidden"
            $width={width}
            $height={height}
            $flex={flex}
            onClick={() => onClick?.()}
            $cursor={cursor}
        >
            {imgSrc ? (
                <Image src={imgSrc} $width="100%" $height="100%" $objectFit="fill" />
            ) : (
                <FlexContainer
                    $width="100%"
                    $height="100%"
                    $justifyContent="center"
                    $alignItems="center"
                >
                    <Paragraph>{NO_IMAGE_AVAILABLE}</Paragraph>
                </FlexContainer>
            )}
        </FlexContainer>
    );
};
