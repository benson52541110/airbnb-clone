import { useEffect, useState } from "react";
import axios from "../utils/axios.js";
import { Link } from "react-router-dom";
import Image from "../components/Image.jsx";
import Category from "../components/Category.jsx";
import { Icon } from "@iconify/react";

export default function IndexPage() {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		axios.get("/places").then((response) => {
			setPlaces(response.data);
		});
	}, []);

	return (
		<div>
			<Category></Category>
			<div className="grid grid-cols-1 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8">
				{places.length > 0 &&
					places.map((place) => (
						<Link to={"/place/" + place._id} key={place._id}>
							<div className="flex mb-2 bg-gray-500 rounded-2xl">
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
							<h3 className="text-sm text-gray-500">房東: {place.address}</h3>
							<div className="mt-1">
								<span className="font-bold">${place.price}</span> 晚
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}
