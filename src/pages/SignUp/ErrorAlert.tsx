import { FlexContainer, Icon, Paragraph } from '@components/index'
import { IErrorAlertProps } from '@pages/SignUp/interfaces'

export const ErrorAlert: React.FC<IErrorAlertProps> = ({errorMessage}) => {
  return (
    <FlexContainer 
        Gap="0.25rem" 
        BackgroundColor="#FEA08B" 
        MarginTop="0.5rem" 
        BorderRadius="0.5rem" 
        Border="0.5px solid #AD2103"
        Padding="0.25rem"
        AlignItems="center"
    >
        <Icon className="fa-regular fa-circle-xmark" FontColor="#AD2103" FontSize="0.875rem"/>
        <Paragraph TextAlign="center" FontColor="#AD2103" FontSize="0.875rem">
            {errorMessage}
        </Paragraph>
    </FlexContainer>
  )
}
