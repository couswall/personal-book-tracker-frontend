import {
    BaseContainer,
    FlexContainer,
    GridContainer,
    Icon,
    IconWrapper,
    Text,
    TitleH4,
} from '@components/index';
import {IDashboardShelf} from '@pages/Home/home.interfaces';
import {SHELF_ICONS} from '@pages/Home/home.constants';

interface IStatsOverviewProps {
    shelves: IDashboardShelf[];
}

export const StatsOverview: React.FC<IStatsOverviewProps> = ({shelves}) => (
    <GridContainer $templateColumns="repeat(3, 1fr)" $gap="1rem" $smTemplateColumns="1fr">
        {shelves.map((shelf) => (
            <FlexContainer
                key={shelf.id}
                $alignItems="center"
                $gap="1rem"
                $padding="1.25rem"
                $borderRadius="0.75rem"
                $border="1px solid"
                backgroundColorVariant="secondary"
                hBorderColorVariant="primary"
                hBoxShadowVariant="glow"
            >
                <IconWrapper shape="square">
                    <Icon variant="primary" className={SHELF_ICONS[shelf.type]} size="lg" />
                </IconWrapper>
                <BaseContainer $backgroundColor="transparent">
                    <Text
                        size="xs"
                        variant="muted"
                        weight="bold"
                        $textTransform="uppercase"
                        $letterSpacing="0.05em"
                    >
                        {shelf.name}
                    </Text>
                    <TitleH4>{shelf.bookCount}</TitleH4>
                </BaseContainer>
            </FlexContainer>
        ))}
    </GridContainer>
);
