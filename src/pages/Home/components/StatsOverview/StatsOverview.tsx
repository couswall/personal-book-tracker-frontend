import {
    BaseContainer,
    FlexContainer,
    GridContainer,
    Icon,
    IconWrapper,
    Text,
    TitleH4,
} from '@components/index';
import {IHomeStat} from '@pages/Home/home.interfaces';

interface IStatsOverviewProps {
    stats: IHomeStat[];
}

export const StatsOverview: React.FC<IStatsOverviewProps> = ({stats}) => (
    <GridContainer $templateColumns="repeat(3, 1fr)" $gap="1rem" $smTemplateColumns="1fr">
        {stats.map((stat) => (
            <FlexContainer
                key={stat.id}
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
                    <Icon variant="primary" className={stat.iconClassName} size="lg" />
                </IconWrapper>
                <BaseContainer $backgroundColor="transparent">
                    <Text
                        size="xs"
                        variant="muted"
                        weight="bold"
                        $textTransform="uppercase"
                        $letterSpacing="0.05em"
                    >
                        {stat.label}
                    </Text>
                    <TitleH4>{stat.value}</TitleH4>
                </BaseContainer>
            </FlexContainer>
        ))}
    </GridContainer>
);
