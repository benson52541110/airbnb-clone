export default function Image({ src, ...rest }) {
	src =
		src && src.includes("https://")
			? src
			: "https://api-cloneairbnb.jp.ngrok.io/uploads/" + src;
	return <img {...rest} src={src} alt={""} />;
}
