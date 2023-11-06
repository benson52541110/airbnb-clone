import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Navigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import RoomType from "../components/RoomType";
import RoomRange from "../components/RoomRange";

export default function PlacesFormPage() {
	const { id } = useParams();
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			address: "",
			photos: [],
			description: "",
			perks: [],
			extraInfo: "",
			checkIn: "",
			checkOut: "",
			maxGuests: "",
			price: "",
			roomType: "",
			roomRange: "",
		},
	});
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (id) {
			axios.get("/places/" + id).then((response) => {
				const { data } = response;
				for (const [key, value] of Object.entries(data)) {
					setValue(key, value !== null ? value : "");
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
				<h2 className="mt-4 text-2xl">房屋名稱</h2>
				<p className="text-sm text-gray-500">
					為您的房屋取個名字，例如：我的小窩
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
					rules={{ required: "房屋名稱為必填項目" }}
				/>
				{errors.title && (
					<span className="text-red-500 ">{errors.title.message}</span>
				)}

				<h2 className="mt-4 text-2xl">地址</h2>
				<p className="text-sm text-gray-500">房屋地址</p>
				<Controller
					name="address"
					control={control}
					render={({ field }) => (
						<input {...field} type="text" placeholder="Address" />
					)}
					rules={{ required: "房屋地址為必填項目" }}
				/>
				{errors.title && (
					<span className="text-red-500 ">{errors.address.message}</span>
				)}

				<h2 className="mt-4 text-2xl">房屋照片</h2>
				<p className="text-sm text-gray-500">越多越好</p>
				<Controller
					name="photos"
					control={control}
					render={({ field }) => (
						<PhotosUploader photos={field.value} onChange={field.onChange} />
					)}
					rules={{ required: "房屋照片5張以上" }}
				/>
				{/* {errors.title && (
					<span className="text-red-500 ">{errors.photos.message}</span>
				)} */}

				<h2 className="mt-4 text-2xl">房屋介紹</h2>
				<p className="text-sm text-gray-500">詳細介紹您的房屋</p>
				<Controller
					name="description"
					control={control}
					render={({ field }) => <textarea {...field} />}
					rules={{ required: "房屋介紹為必填項目" }}
				/>
				{errors.title && (
					<span className="text-red-500 ">{errors.description.message}</span>
				)}

				<h2 className="mt-4 text-2xl">設備與服務</h2>
				<p className="text-sm text-gray-500">選擇您有提供的設備與服務</p>
				<div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
					<Controller
						name="perks"
						control={control}
						render={({ field }) => {
							return <Perks perks={field.value} onChange={field.onChange} />;
						}}
						rules={{ required: "設備與服務至少選一項" }}
					/>
				</div>

				<h2 className="mt-4 text-2xl">您的房源屬於哪一種?</h2>
				<div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
					<Controller
						name="roomType"
						control={control}
						render={({ field }) => {
							return (
								<RoomType
									selectedRoomType={field.value}
									onChange={field.onChange}
								/>
							);
						}}
						rules={{ required: "從其中選一項作為你的房源類型" }}
					/>
				</div>

				<h2 className="mt-4 text-2xl">您的房源範圍是?</h2>
				<div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
					<Controller
						name="roomRange"
						control={control}
						render={({ field }) => {
							return (
								<RoomRange
									selectedRoomRange={field.value}
									onChange={field.onChange}
								/>
							);
						}}
						rules={{ required: "從其中選一項作為你的房源範圍" }}
					/>
				</div>

				<h2 className="mt-4 text-2xl">更多資訊</h2>
				<p className="text-sm text-gray-500">房屋規則與介紹,等等...</p>
				<Controller
					name="extraInfo"
					control={control}
					render={({ field }) => <textarea {...field} />}
				/>

				<h2 className="mt-4 text-2xl">入住與退房時間</h2>
				<p className="text-sm text-gray-500">
					添加房屋的入住與退房時間，以便房客知道何時可以入住與退房
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

				<button className="my-4 primary">儲存</button>
			</form>
		</div>
	);
}
