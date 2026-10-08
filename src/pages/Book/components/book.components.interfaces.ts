export interface ICoverBookImgProps {
    imgSrc?: string | null;
    alt?: string;
    objectFit?: 'fill' | 'cover' | 'contain';
    borderRadius?: string;
    width?: string;
    height?: string;
    flex?: string;
    onClick?: () => void;
    cursor?: string;
}
