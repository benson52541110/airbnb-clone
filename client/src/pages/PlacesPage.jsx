import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Icon } from "@iconify/react";
import RoomCard from "../components/RoomCard";
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
				<RoomCard places={places} url={"/account/places/"} title="places" />
			</div>
		</div>
	);
}
