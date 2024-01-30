interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
}

const Image: React.FC<ImageProps> = ({ src, ...rest }) => {
	src =
		src && src.includes("https://")
			? src
			: `https://api-cloneairbnb.jp.ngrok.io/uploads/${src}`;

	return <img {...rest} src={src} alt="" />;
};

export default Image;
