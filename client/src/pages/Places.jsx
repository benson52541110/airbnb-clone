import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Icon } from "@iconify/react";
export default function PlacesPage() {
	const [places, setPlaces] = useState([]);
	useEffect(() => {
		axios.get("/user-places").then(({ data }) => {
			setPlaces(data);
		});
	}, []);
	return (
		<div>
			<div className="text-center">
				<Link
					className="inline-flex items-center gap-1 px-6 py-2 mt-4 text-white rounded-full bg-primary"
					to={"/account/places/new"}
				>
					<Icon icon="ic:baseline-plus" />
					添加新房源
				</Link>
			</div>
			<div className="grid grid-cols-1 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8">
				{places.length > 0 &&
					places.map((place) => (
						<Link
							to={"/account/places/" + place._id}
							className="flex flex-col gap-2 p-4 bg-gray-100 cursor-pointer"
							key={place._id}
						>
							<div className="flex mb-2 bg-gray-500 rounded-2xl">
								{place.photos?.[0] && (
									<PlaceImg
										className="object-cover w-full h-full rounded-2xl aspect-square"
										place={place}
									/>
								)}
							</div>
							<h2 className="font-bold ">{place.title}</h2>
							<div className="flex items-center my-1">
								<Icon icon="bxs:map" />
								<h3 className="text-sm text-gray-500">{place.address}</h3>
							</div>
							<div className="mt-1">
								<span className="font-bold">${place.price}</span> 晚
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}
