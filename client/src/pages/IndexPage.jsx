import { useEffect, useState } from "react";
import Category from "../components/Category.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Loading from "../components/Loading.jsx";
import axios from "../utils/axios";

export default function IndexPage() {
	const [places, setPlaces] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("greenhouse");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios.get("/places").then((response) => {
			setPlaces(response.data);
			setIsLoading(false);
		});
	}, []);

	const filteredPlaces = selectedCategory
		? places.filter((place) => place.roomCategory === selectedCategory)
		: places;

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Category
						initialCategory="greenhouse"
						onCategorySelect={(category) => setSelectedCategory(category)}
					></Category>
					<div className="grid grid-cols-1 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8">
						<RoomCard
							places={filteredPlaces}
							url={"/place/"}
							title="index"
						></RoomCard>
					</div>
				</>
			)}
		</>
	);
}
