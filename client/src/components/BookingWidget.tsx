import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../utils/axios";

interface BookingWidgetProps {
	place: {
		address: string;
		photos: string[];
		description: string;
		listSelection: string[];
		extraInfo: string;
		checkIn: number;
		checkOut: number;
		maxGuests: number;
		price: number;
		roomType: string;
		roomRange: string;
		roomCategory: string;
		bed: number;
		room: number;
		bedroom: number;
		landlord: string;
	};
}

export default function BookingWidget({ place }: BookingWidgetProps) {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [redirect, setRedirect] = useState("");
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user]);

	let numberOfNights = 0;
	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}

	async function bookThisPlace() {
		if (!user) {
			setRedirect("/login");
			return;
		}
		const response = await axios.post("/bookings", {
			checkIn,
			checkOut,
			numberOfGuests,
			name,
			phone,
			place: place._id,
			price: numberOfNights * place.price,
		});
		const bookingId = response.data._id;
		setRedirect(`/account/bookings/${bookingId}`);
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div className="p-4 bg-white shadow rounded-2xl">
			<div className="text-2xl text-center">${place.price} / 晚</div>
			<div className="mt-4 border rounded-2xl">
				<div className="flex flex-col items-center md:flex-row">
					<div className="flex-1 px-4 py-3">
						<label>入住:</label>
						<input
							type="date"
							value={checkIn}
							onChange={(ev) => setCheckIn(ev.target.value)}
						/>
					</div>
					<div className="flex-1 px-4 py-3 md:border-l">
						<label>退房:</label>
						<input
							type="date"
							value={checkOut}
							onChange={(ev) => setCheckOut(ev.target.value)}
						/>
					</div>
				</div>
				<div className="px-4 py-3 border-t">
					<label>入住人數:</label>
					<input
						type="number"
						value={numberOfGuests}
						onChange={(ev) => setNumberOfGuests(ev.target.value)}
					/>
				</div>
				{numberOfNights > 0 && (
					<div className="px-4 py-3 border-t">
						<label>您的名字:</label>
						<input
							type="text"
							value={name}
							onChange={(ev) => setName(ev.target.value)}
						/>
						<label>電話號碼:</label>
						<input
							type="tel"
							value={phone}
							onChange={(ev) => setPhone(ev.target.value)}
						/>
					</div>
				)}
			</div>
			<button onClick={bookThisPlace} className="mt-4 primary">
				預訂
			</button>
		</div>
	);
}
