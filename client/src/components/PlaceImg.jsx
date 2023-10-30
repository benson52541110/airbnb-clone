import Image from "./Image.jsx";

export default function PlaceImg({ place, index = 0, className = null }) {
	if (!place.photos?.length) {
		return "";
	}
	if (!className) {
		className = "object-cover w-full h-full rounded-2xl aspect-square";
	}
	return <Image className={className} src={place.photos[index]} alt="" />;
}
