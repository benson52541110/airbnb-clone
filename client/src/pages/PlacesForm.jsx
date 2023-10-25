import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";

export default function PlacesFormPage() {
	const { id } = useParams();
	const { handleSubmit, control, setValue } = useForm({
		defaultValues: {
			title: "",
			address: "",
			addedPhotos: [],
			description: "",
			perks: [],
			extraInfo: "",
			checkIn: "",
			checkOut: "",
			maxGuests: "",
			price: "",
		},
	});
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (id) {
			axios.get("/places/" + id).then((response) => {
				const { data } = response;
				console.log(response);
				for (const [key, value] of Object.entries(data)) {
					setValue(key, value);
				}
			});
		}
	}, [id, setValue]);
	const onSubmit = async (data) => {
		if (id) {
			await axios.put("/places/", { id, ...data });
		} else {
			await axios.post("/places", data);
		}
		setRedirect(true);
	};

	if (redirect) {
		return <Navigate to="/account/places" />;
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* For Title */}
				<h2 className="mt-4 text-2xl">Title</h2>
				<p className="text-sm text-gray-500">
					Title for your place. Should be short and catchy as in advertisement
				</p>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<input
							{...field}
							type="text"
							placeholder="Title, for example: My lovely apt"
						/>
					)}
				/>

				{/* For Address */}
				<h2 className="mt-4 text-2xl">Address</h2>
				<p className="text-sm text-gray-500">Address to this place</p>
				<Controller
					name="address"
					control={control}
					render={({ field }) => (
						<input {...field} type="text" placeholder="Address" />
					)}
				/>

				{/* For Photos */}
				<h2 className="mt-4 text-2xl">Photos</h2>
				<p className="text-sm text-gray-500">More = better</p>
				<Controller
					name="addedPhotos"
					control={control}
					render={({ field }) => (
						<PhotosUploader
							addedPhotos={field.value}
							onChange={field.onChange}
						/>
					)}
				/>

				{/* For Description */}
				<h2 className="mt-4 text-2xl">Description</h2>
				<p className="text-sm text-gray-500">Description of the place</p>
				<Controller
					name="description"
					control={control}
					render={({ field }) => <textarea {...field} />}
				/>

				{/* For Perks */}
				<h2 className="mt-4 text-2xl">Perks</h2>
				<p className="text-sm text-gray-500">
					Select all the perks of your place
				</p>
				<div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
					<Controller
						name="perks"
						control={control}
						render={({ field }) => {
							return <Perks perks={field.value} onChange={field.onChange} />;
						}}
					/>
				</div>

				{/* For Extra Info */}
				<h2 className="mt-4 text-2xl">Extra Info</h2>
				<p className="text-sm text-gray-500">House rules, etc</p>
				<Controller
					name="extraInfo"
					control={control}
					render={({ field }) => <textarea {...field} />}
				/>

				{/* For Check In & Check Out Times */}
				<h2 className="mt-4 text-2xl">Check In & Out Times</h2>
				<p className="text-sm text-gray-500">
					Add check in and out times, remember to have some time window for
					cleaning the room between guests
				</p>
				<div className="grid grid-cols-2 gap-2 md:grid-cols-4">
					<Controller
						name="checkIn"
						control={control}
						render={({ field }) => (
							<input {...field} type="text" placeholder="14" />
						)}
					/>
					<Controller
						name="checkOut"
						control={control}
						render={({ field }) => (
							<input {...field} type="text" placeholder="11" />
						)}
					/>
					<Controller
						name="maxGuests"
						control={control}
						render={({ field }) => <input {...field} type="number" />}
					/>
					<Controller
						name="price"
						control={control}
						render={({ field }) => <input {...field} type="number" />}
					/>
				</div>

				<button className="my-4 primary">Save</button>
			</form>
		</div>
	);
}
