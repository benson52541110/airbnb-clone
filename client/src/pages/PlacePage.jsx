import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import { perksList, roomTypeList } from "../data/PlaceFormData";
import PerkItem from "../components/UI/PerkItem";

export default function PlacePage() {
	const { id } = useParams();
	const [place, setPlace] = useState(null);
	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/places/${id}`).then((response) => {
			setPlace(response.data);
			console.log(response.data);
		});
	}, [id]);

	if (!place) return "";

	const perkItems = place.perks?.map((perk) => {
		const perkData = perksList.find((perkData) => perkData.name === perk);
		return (
			<PerkItem
				key={perkData.name}
				name={perkData.name}
				icon={perkData.icon}
				text={perkData.text}
			/>
		);
	});

	const renderRoomType = () => {
		const roomTypeData = roomTypeList.find((rt) => rt.name === place.roomType);
		if (!roomTypeData) {
			console.error("Room type data not found for:", place.roomType);
			return null;
		}
		return (
			<PerkItem
				key={roomTypeData.name}
				name={roomTypeData.name}
				icon={roomTypeData.icon}
				text={roomTypeData.text}
			/>
		);
	};
	return (
		<div className="px-8 pt-8 mx-8 mt-4">
			<h1 className="text-3xl">{place.title}</h1>
			<AddressLink>{place.address}</AddressLink>
			<PlaceGallery place={place} />
			<div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
				<div className="flex flex-col gap-8 px-2">
					<div className="flex flex-col gap-2 py-8 border-b-2">
						<h2 className="text-2xl font-semibold">出租的 {place.roomType}</h2>
						<p>
							{place.maxGuests}位．{place.room}間臥室．{place.bed}張床．
							{place.bedroom}間衛浴
						</p>
					</div>
					<div className="py-8 border-b-2">
						<p>{place.description}</p>
					</div>
					<div className="grid grid-cols-2 gap-4 py-8 border-b-2">
						{perkItems}
					</div>
					<div>
						<h2 className="mb-2 text-2xl font-semibold">住宿地點</h2>
						{renderRoomType()}
					</div>
				</div>
				<div>
					<BookingWidget place={place} />
				</div>
			</div>
			<div className="px-8 py-8 -mx-8 bg-white border-t">
				<div>
					<h2 className="mb-2 text-2xl font-semibold">額外資訊</h2>
				</div>
				<div className="mt-2 mb-4 text-sm leading-5 text-gray-700">
					{place.extraInfo}
				</div>
			</div>
		</div>
	);
}
