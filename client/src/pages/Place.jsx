import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

export default function PlacePage() {
	const { id } = useParams();
	const [place, setPlace] = useState(null);
	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/places/${id}`).then((response) => {
			setPlace(response.data);
		});
	}, [id]);

	if (!place) return "";

	return (
		<div className="px-8 pt-8 mt-4 -mx-8 bg-gray-100">
			<h1 className="text-3xl">{place.title}</h1>
			<AddressLink>{place.address}</AddressLink>
			<PlaceGallery place={place} />
			<div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
				<div>
					<div className="my-4">
						<h2 className="text-2xl font-semibold">房型介紹</h2>
						{place.description}
					</div>
					入住時間: {place.checkIn}
					<br />
					退房時間: {place.checkOut}
					<br />
					最大人數: {place.maxGuests}
				</div>
				<div>
					<BookingWidget place={place} />
				</div>
			</div>
			<div className="px-8 py-8 -mx-8 bg-white border-t">
				<div>
					<h2 className="text-2xl font-semibold">額外資訊</h2>
				</div>
				<div className="mt-2 mb-4 text-sm leading-5 text-gray-700">
					{place.extraInfo}
				</div>
			</div>
		</div>
	);
}
