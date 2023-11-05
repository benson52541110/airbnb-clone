import { useState } from "react";
import Image from "./Image.jsx";
import { Icon } from "@iconify/react";

export default function PlaceGallery({ place }) {
	const [showAllPhotos, setShowAllPhotos] = useState(false);

	const Photo = ({ photo }) => {
		const handleClick = () => setShowAllPhotos(true);
		return photo ? (
			<Image
				onClick={handleClick}
				className="object-cover cursor-pointer aspect-[4/3] hover:grayscale-[40%] h-full"
				src={photo}
				alt={`Photo`}
			/>
		) : null;
	};

	if (showAllPhotos) {
		return (
			<div className="absolute inset-0 min-h-screen text-white bg-black">
				<div className="grid gap-4 p-8 bg-black">
					<div>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="fixed flex gap-1 p-2 text-black bg-white shadow x-4 right-12 top-8 rounded-2xl shadow-black"
						>
							<Icon icon="iconoir:cancel" />
						</button>
					</div>
					{place?.photos?.length > 0 &&
						place.photos.map((photo) => (
							<div key={photo}>
								<Image src={photo} alt="" />
							</div>
						))}
				</div>
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-3xl overflow-hidden">
				<div>
					<Photo photo={place.photos?.[0]} />
				</div>
				<div className="grid grid-rows-2 gap-2">
					<Photo photo={place.photos?.[1]} />
					<div className="overflow-hidden">
						<Photo photo={place.photos?.[2]} />
					</div>
				</div>
				<div className="grid grid-rows-2 gap-2">
					<Photo photo={place.photos?.[3]} />
					<div className="overflow-hidden">
						<Photo photo={place.photos?.[4]} />
					</div>
				</div>
			</div>
			<button
				onClick={() => setShowAllPhotos(true)}
				className="absolute flex items-center gap-1 px-4 py-2 bg-white shadow shadow-md bottom-2 right-2 rounded-2xl shadow-gray-500"
			>
				<Icon icon="mdi:dots-grid" />
				顯示全部照片
			</button>
		</div>
	);
}
