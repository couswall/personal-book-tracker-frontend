import React from 'react';
import {FlexContainer, Image, Paragraph} from '@components/index';

interface CoverBookImgProps {
    imgSrc?: string | null;
    width?: string;
    height?: string;
    flex?: string;
}

export const CoverBookImg: React.FC<CoverBookImgProps> = ({
    imgSrc,
    width = '220px',
    height = '280px',
    flex,
}) => {
    return (
        <FlexContainer
            BorderRadius="0.5rem"
            Overflow="hidden"
            Width={width}
            Height={height}
            Flex={flex}
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
                    <Paragraph>{'No Image Available'}</Paragraph>
                </FlexContainer>
            )}
        </FlexContainer>
    );
};
