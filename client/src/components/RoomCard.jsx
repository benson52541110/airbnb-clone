import Image from "../components/Image.jsx";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoomCard({ places, url }) {
	const { user } = useSelector((state) => state.user);
	return (
		<>
			{places.length > 0 &&
				places.map((place) => (
					<Link to={url + place._id} key={place._id}>
						<div className="flex mb-2 rounded-2xl">
							{place.photos?.[0] && (
								<Image
									className="object-cover w-full h-full rounded-2xl aspect-square"
									src={place.photos?.[0]}
									alt={place.title}
								/>
							)}
						</div>
						<h2 className="font-bold ">{place.title}</h2>
						<div className="flex items-center my-1">
							<Icon icon="bxs:map" />
							<h3 className="text-sm text-gray-500">{place.address}</h3>
						</div>
						<h3 className="text-sm text-gray-500">房東:</h3>
						<div className="mt-1">
							<span className="font-bold">${place.price}</span> 晚
						</div>
					</Link>
				))}
		</>
	);
}
