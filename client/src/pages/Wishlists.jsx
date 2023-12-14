import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Wishlists() {
	const [places, setPlaces] = useState([]);
	const { user } = useSelector((state) => state.user);
	useEffect(() => {
		axios.get("/places").then(({ data }) => {
			data = data.filter((place) => user.favorites.includes(place._id));
			setPlaces(data);
		});
	}, []);
	return (
		<div className="grid grid-cols-1 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8">
			<RoomCard places={places} url={`/place/`} title="index" />
		</div>
	);
}

export default Wishlists;
