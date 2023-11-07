import axios from "../utils/axios";
import { useState } from "react";
import Image from "./Image";
import { Icon } from "@iconify/react";

export default function PhotosUploader({ photos, onChange }) {
	const [photoLink, setPhotoLink] = useState("");
	async function addPhotoByLink(ev) {
		ev.preventDefault();
		const { data: filename } = await axios.post("/upload-by-link", {
			link: photoLink,
		});
		onChange((prev) => {
			return [...prev, filename];
		});
		setPhotoLink("");
	}
	function uploadPhoto(ev) {
		const files = ev.target.files;
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append("photos", files[i]);
		}
		axios
			.post("/upload", data, {
				headers: { "Content-type": "multipart/form-data" },
			})
			.then((response) => {
				const { data: filenames } = response;
				onChange([...filenames]);
			});
	}
	function removePhoto(ev, filename) {
		ev.preventDefault();
		onChange([...photos.filter((photo) => photo !== filename)]);
	}
	function selectAsMainPhoto(ev, filename) {
		ev.preventDefault();
		onChange([filename, ...photos.filter((photo) => photo !== filename)]);
	}
	return (
		<>
			<div className="flex gap-2">
				<input
					value={photoLink || ""}
					onChange={(ev) => setPhotoLink(ev.target.value)}
					type="text"
					placeholder={"Add using a link ....jpg"}
				/>
				<button
					onClick={addPhotoByLink}
					className="px-4 bg-gray-200 rounded-2xl whitespace-nowrap"
				>
					添加鏈結
				</button>
			</div>
			<div className="grid grid-cols-3 gap-2 mt-2 md:grid-cols-4 lg:grid-cols-6">
				{photos?.length > 0 &&
					photos.map((link) => (
						<div className="relative flex h-32" key={link}>
							<Image
								className="object-cover w-full rounded-2xl"
								src={link}
								alt=""
							/>
							<button
								onClick={(ev) => removePhoto(ev, link)}
								className="absolute px-3 py-2 text-white bg-black bg-opacity-50 cursor-pointer bottom-1 right-1 rounded-2xl"
							>
								<Icon icon="mdi:garbage" className="text-lg " />
							</button>
							<button
								onClick={(ev) => selectAsMainPhoto(ev, link)}
								className="absolute px-3 py-2 text-white bg-black bg-opacity-50 cursor-pointer bottom-1 left-1 rounded-2xl"
							>
								{link === photos[0] && <Icon icon="ic:baseline-star" />}
								{link !== photos[0] && <Icon icon="mdi:star-outline" />}
							</button>
						</div>
					))}
				<label className="flex items-center justify-center h-32 gap-1 p-2 text-2xl text-gray-600 bg-transparent border cursor-pointer rounded-2xl">
					<input
						type="file"
						multiple
						className="hidden"
						onChange={uploadPhoto}
					/>
					<Icon icon="solar:upload-linear" />
					Upload
				</label>
			</div>
		</>
	);
}
