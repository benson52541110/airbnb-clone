import { useEffect, useState } from "react";
import Category from "../components/Category";
import RoomCard from "../components/RoomCard";
import Loading from "../components/Loading";
import axios from "../utils/axios";
import { Place } from "../types/place";

const IndexPage: React.FC = () => {
	const [places, setPlaces] = useState<Place[]>([]);
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
};

export default IndexPage;
