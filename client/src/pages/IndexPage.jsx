import { useEffect, useState } from "react";
import axios from "../utils/axios.js";
import Category from "../components/Category.jsx";
import RoomCard from "../components/RoomCard.jsx";

export default function IndexPage() {
	const [places, setPlaces] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("greenhouse");

	useEffect(() => {
		axios.get("/places").then((response) => {
			setPlaces(response.data);
		});
	}, []);

	const filteredPlaces = selectedCategory
		? places.filter((place) => place.roomCategory === selectedCategory)
		: places;

	return (
		<div>
			<Category
				initialCategory="greenhouse"
				onCategorySelect={(category) => setSelectedCategory(category)}
			></Category>
			<div className="grid grid-cols-1 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8">
				<RoomCard places={filteredPlaces} url={"/place/"}></RoomCard>
			</div>
		</div>
	);
}
