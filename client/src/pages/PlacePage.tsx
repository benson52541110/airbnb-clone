import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import PerkItem from "../components/UI/PerkItem";
import { servicesList, roomTypeList } from "../data/PlaceFormData";
import axios from "../utils/axios";

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

	const perkItems = place.listSelection?.map((perk) => {
		const perkData = servicesList.find((perkData) => perkData.name === perk);
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
		<div className="grid-cols-2 px-4 pt-8 mx-8 mt-4 md:px-8">
			<h1 className="text-3xl">{place.title}</h1>
			<AddressLink>{place.address}</AddressLink>
			<PlaceGallery place={place} />
			<div className="mt-8 mb-8 grid gap-8 grid-cols-21 md:grid-cols-[2fr_1fr]">
				<div className="flex flex-col col-span-2 gap-8 px-2 lg:col-span-1">
					<div className="flex flex-col gap-2 py-8 border-b-2">
						<h2 className="text-2xl font-semibold">
							{place.landlord}出租的 {place.roomType}
						</h2>
						<p>
							{place.maxGuests}位．{place.room}間臥室．{place.bed}張床．
							{place.bedroom}間衛浴
						</p>
					</div>
					<div className="pb-8 border-b-2">
						<p>{place.description}</p>
					</div>
					<div>
						<h2 className="mb-2 text-2xl font-semibold ">福利設施</h2>
						<div className="grid grid-cols-1 gap-4 pb-8 border-b-2 sm:grid-cols-2">
							{perkItems}
						</div>
					</div>
					<div>
						<h2 className="mb-2 text-2xl font-semibold">住宿地點</h2>
						<div className="grid grid-cols-1 gap-4 pb-8 border-b-2 sm:grid-cols-2">
							{renderRoomType()}
						</div>
					</div>
				</div>
				<div className="col-span-2 lg:col-span-1">
					<BookingWidget place={place} />
				</div>
			</div>
			<div className="px-8 py-8 -mx-8 bg-white border-t">
				<div>
					<h2 className="mb-2 text-2xl font-semibold">額外資訊</h2>
				</div>
				<div className="mt-2 mb-4 text-sm leading-5 text-gray-700">
					{place?.extraInfo}
				</div>
			</div>
		</div>
	);
}
