import { useState } from "react";
import Image from "./Image.jsx";
import { Icon } from "@iconify/react";

export default function PlaceGallery({ place }) {
	const [showAllPhotos, setShowAllPhotos] = useState(false);

	if (showAllPhotos) {
		return (
			<div className="absolute inset-0 min-h-screen text-white bg-black">
				<div className="grid gap-4 p-8 bg-black">
					<div>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="fixed flex gap-1 p-2 text-black bg-white shadow p x-4 right-12 top-8 rounded-2xl shadow-black"
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
			<div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
				<div>
					{place.photos?.[0] && (
						<div>
							<Image
								onClick={() => setShowAllPhotos(true)}
								className="object-cover cursor-pointer aspect-square"
								src={place.photos[0]}
								alt=""
							/>
						</div>
					)}
				</div>
				<div className="grid">
					{place.photos?.[1] && (
						<Image
							onClick={() => setShowAllPhotos(true)}
							className="object-cover cursor-pointer aspect-square"
							src={place.photos[1]}
							alt=""
						/>
					)}
					<div className="overflow-hidden">
						{place.photos?.[2] && (
							<Image
								onClick={() => setShowAllPhotos(true)}
								className="relative object-cover cursor-pointer aspect-square top-2"
								src={place.photos[2]}
								alt=""
							/>
						)}
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
