import {DiamondSVG} from '@components/Logo/index';

interface IDiamondSVGProps {
    size?: string;
    color?: string;
    triangleColor?: string;
}

export const LogoIcon: React.FC<IDiamondSVGProps> = ({size, color, triangleColor}) => {
    return (
        <DiamondSVG
            size={size}
            color={color}
            triangleColor={triangleColor}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                fillRule="evenodd"
            />
        </DiamondSVG>
    );
};

export default LogoIcon;
