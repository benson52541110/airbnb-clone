import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { Place } from "../types/place";

interface BookingWidgetProps {
	place: Place;
}

interface BookingWidgetState {
	checkIn: string;
	checkOut: string;
	numberOfGuests: number;
	name: string;
	phone: string;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ place }) => {
	const [booking, setBooking] = useState<BookingWidgetState>({
		checkIn: "",
		checkOut: "",
		numberOfGuests: 1,
		name: "",
		phone: "",
	});
	const [redirect, setRedirect] = useState("");
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		if (user) {
			setBooking((prev) => ({ ...prev, name: user.name }));
		}
	}, [user]);

	let numberOfNights = 0;
	if (booking.checkIn && booking.checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(booking.checkOut),
			new Date(booking.checkIn)
		);
	}

	async function bookThisPlace() {
		if (!user) {
			setRedirect("/login");
			return;
		}
		const response = await axios.post("/bookings", {
			checkIn: booking.checkIn,
			checkOut: booking.checkOut,
			numberOfGuests: booking.numberOfGuests,
			name: booking.name,
			phone: booking.phone,
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
							value={booking.checkIn}
							onChange={(ev) =>
								setBooking({ ...booking, checkIn: ev.target.value })
							}
						/>
					</div>
					<div className="flex-1 px-4 py-3 md:border-l">
						<label>退房:</label>
						<input
							type="date"
							value={booking.checkOut}
							onChange={(ev) =>
								setBooking({ ...booking, checkOut: ev.target.value })
							}
						/>
					</div>
				</div>
				<div className="px-4 py-3 border-t">
					<label>入住人數:</label>
					<input
						type="number"
						min="1"
						value={booking.numberOfGuests}
						onChange={(ev) =>
							setBooking({
								...booking,
								numberOfGuests: parseInt(ev.target.value),
							})
						}
					/>
				</div>
				{numberOfNights > 0 && (
					<div className="px-4 py-3 border-t">
						<label>您的名字:</label>
						<input
							type="text"
							value={booking.name}
							onChange={(ev) =>
								setBooking({ ...booking, name: ev.target.value })
							}
						/>
						<label>電話號碼:</label>
						<input
							type="tel"
							value={booking.phone}
							onChange={(ev) =>
								setBooking({ ...booking, phone: ev.target.value })
							}
						/>
					</div>
				)}
			</div>
			<button onClick={bookThisPlace} className="mt-4 primary">
				預訂
			</button>
		</div>
	);
};

export default BookingWidget;
