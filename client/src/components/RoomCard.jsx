import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Modal from "../components/UI/Modal.jsx";
import Image from "../components/Image.tsx";
import Favorite from "./UI/Favorite.jsx";
import axios from "../utils/axios";

export default function RoomCard({ places, url, title }) {
	const [localPlaces, setLocalPlaces] = useState(places);
	const [activeModal, setActiveModal] = useState(null);
	const navigate = useNavigate();
	const handleOpenModal = (placeId) => {
		if (title !== "index") {
			setActiveModal(placeId);
		}
	};

	const handleCloseModal = () => {
		setActiveModal(null);
	};

	const handleEdit = (placeId) => {
		navigate(url + placeId);
		handleCloseModal();
	};

	const handleDelete = (placeId) => {
		axios
			.delete(`/places/${placeId}`)
			.then(() => {
				const updatedPlaces = localPlaces.filter(
					(place) => place._id !== placeId
				);
				setLocalPlaces(updatedPlaces);
				setActiveModal(null);
			})
			.catch((err) => {
				console.error("刪除房源時出錯：", err);
			});
	};

	useEffect(() => {
		setLocalPlaces(places);
	}, [places]);

	return (
		<>
			{localPlaces.length > 0 &&
				localPlaces.map((place) => (
					<div key={place._id} className="relative">
						<Link
							to={title === "index" ? url + place._id : "#"}
							onClick={() => handleOpenModal(place._id)}
						>
							<div className="flex mb-2 rounded-2xl">
								{place.photos?.[0] && (
									<Image
										className="object-cover rounded-2xl aspect-square"
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
							<h3 className="text-sm text-gray-500">房東:{place.landlord}</h3>
							<div className="mt-1">
								<span className="font-bold">${place.price}</span> 晚
							</div>
						</Link>
						{activeModal === place._id && (
							<Modal
								onClose={handleCloseModal}
								onDelete={() => handleDelete(place._id)}
								onEdit={() => {
									handleEdit(place._id);
								}}
							/>
						)}
						{title === "index" && (
							<div className="absolute text-2xl cursor-pointer right-4 top-4 ">
								<Favorite id={place._id}></Favorite>
							</div>
						)}
					</div>
				))}
		</>
	);
}
