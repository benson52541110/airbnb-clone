import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import PhotosUploader from "../components/PhotosUploader";
import ListSelection from "../components/ListSelection";
import axios from "../utils/axios";

export default function PlacesFormPage() {
	const { id } = useParams();
	const { user } = useSelector((state) => state.user);
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
			listSelection: [],
			extraInfo: "",
			checkIn: "",
			checkOut: "",
			maxGuests: "",
			price: "",
			roomType: "",
			roomRange: "",
			roomCategory: "",
			room: "",
			bed: "",
			bedroom: "",
			landlord: user.name,
		},
	});
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const response = await axios.get(`/places/${id}`);
					Object.entries(response.data).forEach(([key, value]) =>
						setValue(key, value ?? "")
					);
				}
			} catch (error) {
				console.error("An error occurred while fetching data", error);
			}
		};

		fetchData();
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
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-12"
			>
				<div className="col-span-2 md:col-span-1">
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
								className={errors.title ? "border-red-500" : ""}
							/>
						)}
						rules={{ required: "房屋名稱為必填項目" }}
					/>
					{errors.title && (
						<span className="text-red-500 ">{errors.title.message}</span>
					)}
				</div>
				<div className="col-span-2 md:col-span-1">
					<h2 className="mt-4 text-2xl">價格</h2>
					<p className="text-sm text-gray-500">房間價格</p>
					<Controller
						name="price"
						control={control}
						render={({ field }) => (
							<input
								{...field}
								type="number"
								placeholder="price"
								className={errors.price ? "border-red-500" : ""}
							/>
						)}
						rules={{ required: "價格為必填項目" }}
					/>
					{errors.price && (
						<span className="text-red-500 ">{errors.price.message}</span>
					)}
				</div>
				<div className="col-span-2 md:col-span-1">
					<h2 className="mt-4 text-2xl">地址</h2>
					<p className="text-sm text-gray-500">房屋地址</p>
					<Controller
						name="address"
						control={control}
						render={({ field }) => (
							<input
								{...field}
								type="text"
								placeholder="Address"
								className={errors.address ? "border-red-500" : ""}
							/>
						)}
						rules={{ required: "房屋地址為必填項目" }}
					/>
					{errors.address && (
						<span className="text-red-500 ">{errors.address.message}</span>
					)}
				</div>
				<div className="col-span-2 md:col-span-1">
					<h2 className="mt-4 text-2xl">房屋介紹</h2>
					<p className="text-sm text-gray-500">詳細介紹您的房屋</p>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<textarea
								{...field}
								className={errors.description ? "border-red-500" : ""}
							/>
						)}
						rules={{ required: "房屋介紹為必填項目" }}
					/>
					{errors.description && (
						<span className="text-red-500 ">{errors.description.message}</span>
					)}
				</div>
				<div className="col-span-2">
					<h2 className="mt-4 text-2xl">房屋照片</h2>
					<p className="text-sm text-gray-500">越多越好</p>
					<Controller
						name="photos"
						control={control}
						render={({ field }) => (
							<PhotosUploader photos={field.value} onChange={field.onChange} />
						)}
						rules={{
							required: "房屋照片至少5張以上",
							validate: {
								minLength: (value) =>
									value.length >= 5 || "房屋照片至少需要5張以上",
							},
						}}
					/>
					{errors.photos && (
						<span className="text-red-500 ">
							{errors.photos.message ||
								(errors.photos.type === "minLength" &&
									"房屋照片至少需要5張以上")}
						</span>
					)}
				</div>
				<div className="col-span-2">
					<h2 className="mt-4 text-2xl">設備與服務</h2>
					<p className="text-sm text-gray-500">選擇您有提供的設備與服務</p>
					{errors.listSelection && (
						<span className="text-red-500 ">
							{errors.listSelection.message}
						</span>
					)}
				</div>
				<div className="grid grid-cols-1 col-span-2 gap-2 md:grid-cols-3 lg:grid-cols-6 sm:grid-cols-2">
					<Controller
						name="listSelection"
						control={control}
						render={({ field }) => {
							return (
								<ListSelection
									selectedItems={field.value}
									onChange={field.onChange}
									isMultiSelect={true}
									title="services"
								/>
							);
						}}
						rules={{ required: "設備與服務至少選一項" }}
					/>
				</div>
				<div className="col-span-2">
					<h2 className="mt-4 text-2xl">您的房源屬於哪一種?</h2>
					{errors.roomType && (
						<span className="text-red-500 ">{errors.roomType.message}</span>
					)}
				</div>
				<div className="grid grid-cols-1 col-span-2 gap-2 md:grid-cols-3 lg:grid-cols-6 sm:grid-cols-2">
					<Controller
						name="roomType"
						control={control}
						render={({ field }) => {
							return (
								<ListSelection
									selectedItems={field.value}
									title="roomType"
									selected={field.value}
									onChange={field.onChange}
								/>
							);
						}}
						rules={{ required: "從其中選一項作為你的房源類型" }}
					/>
				</div>
				<div className="col-span-2">
					<h2 className="mt-4 text-2xl">您的房源範圍是?</h2>
					{errors.roomRange && (
						<span className="text-red-500 ">{errors.roomRange.message}</span>
					)}

					<div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6 sm:grid-cols-2">
						<Controller
							name="roomRange"
							control={control}
							render={({ field }) => {
								return (
									<ListSelection
										selectedItems={field.value}
										title="roomRange"
										selected={field.value}
										onChange={field.onChange}
									/>
								);
							}}
							rules={{ required: "從其中選一項作為你的房源範圍" }}
						/>
					</div>
				</div>
				<div className="col-span-2">
					<h2 className="mt-4 text-2xl">您的房源種類是?</h2>
					{errors.roomCategory && (
						<span className="text-red-500 ">{errors.roomCategory.message}</span>
					)}

					<div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6 sm:grid-cols-2">
						<Controller
							name="roomCategory"
							control={control}
							render={({ field }) => {
								return (
									<ListSelection
										selectedItems={field.value}
										title="roomCategory"
										selected={field.value}
										onChange={field.onChange}
									/>
								);
							}}
							rules={{ required: "從其中選一項作為你的房源範圍" }}
						/>
					</div>
				</div>
				<div className="col-span-2">
					<h2 className="mt-4 text-2xl">房間設定</h2>
					<p className="text-sm text-gray-500">添加入住人數以及床鋪數量</p>
					<div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
						<div className="flex items-center">
							<h3 className="mr-2 whitespace-nowrap">最大人數</h3>
							<Controller
								name="maxGuests"
								control={control}
								render={({ field }) => (
									<input {...field} type="number" placeholder="最多人數" />
								)}
							/>
						</div>
						<div className="flex items-center">
							<h3 className="mr-2 whitespace-nowrap">房間數量</h3>
							<Controller
								name="room"
								control={control}
								render={({ field }) => (
									<input {...field} type="number" placeholder="房間數量" />
								)}
							/>
						</div>
						<div className="flex items-center">
							<h3 className="mr-2 whitespace-nowrap">床鋪數量</h3>
							<Controller
								name="bed"
								control={control}
								render={({ field }) => (
									<input {...field} type="number" placeholder="床鋪數量" />
								)}
							/>
						</div>
						<div className="flex items-center">
							<h3 className="mr-2 whitespace-nowrap">衛浴數量</h3>
							<Controller
								name="bedroom"
								control={control}
								render={({ field }) => (
									<input {...field} type="number" placeholder="衛浴數量" />
								)}
							/>
						</div>
					</div>
				</div>
				<div className="col-span-2">
					<h2 className="mt-4 text-2xl">更多資訊</h2>
					<p className="text-sm text-gray-500">房屋規則與介紹</p>
					<Controller
						name="extraInfo"
						control={control}
						render={({ field }) => <textarea {...field} />}
					/>
				</div>
				<div>
					<button className="w-1/2 col-span-2 my-4 primary">儲存</button>
				</div>
			</form>
		</div>
	);
}
