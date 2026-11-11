import {FlexContainer, Icon, Text} from '@components/index';
import {CalloutContainer} from '@pages/Book/components/AddToBookshelfModal/bookshelfConfirmations.styled';
import {IWarningCalloutProps} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';

export const WarningCallout: React.FC<IWarningCalloutProps> = ({lines}) => {
    const [headline, ...details] = lines;
    return (
        <CalloutContainer role="alert">
            <Icon
                className="fa-solid fa-triangle-exclamation"
                $fontColor="inherit"
                size="md"
                $margin="0.125rem 0 0"
            />
            <FlexContainer $flexDirection="column" $gap="0.25rem" $backgroundColor="transparent">
                <Text size="sm" weight="semibold" $fontColor="inherit">
                    {headline}
                </Text>
                {details.map((line) => (
                    <Text key={line} size="xs" variant="muted" $lineHeight="1.5">
                        {line}
                    </Text>
                ))}
            </FlexContainer>
        </CalloutContainer>
    );
};
