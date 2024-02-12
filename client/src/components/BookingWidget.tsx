import { useEffect, useState } from "react";
import {
	format,
	addDays,
	parseISO,
	isAfter,
	differenceInCalendarDays,
} from "date-fns";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Place } from "../types/place";
import { Booking } from "../types/booking";
import axios from "../utils/axios";
interface BookingWidgetProps {
	place: Place;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ place }) => {
	const [booking, setBooking] = useState<Booking>({
		checkIn: new Date(),
		checkOut: addDays(new Date(), 1),
		numberOfGuests: 1,
		name: "",
		phone: "",
	});
	let numberOfNights = differenceInCalendarDays(
		new Date(booking.checkOut),
		new Date(booking.checkIn)
	);
	const [redirect, setRedirect] = useState("");
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		if (user) {
			setBooking((prev) => ({ ...prev, name: user.name }));
		}
	}, [user]);

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
			totalPrice: numberOfNights * place.price * booking.numberOfGuests,
		});
		const bookingId = response.data._id;
		setRedirect(`/account/bookings/${bookingId}`);
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	const currentDate = format(new Date(), "yyyy-MM-dd");

	return (
		<div className="p-4 bg-white shadow rounded-2xl">
			<div className="text-2xl text-center">${place.price} / 晚</div>
			<div className="mt-4 border rounded-2xl">
				<div className="flex flex-col items-center md:flex-row">
					<div className="flex-1 px-4 py-3">
						<label>入住:</label>
						<input
							type="date"
							min={currentDate}
							value={format(new Date(booking.checkIn), "yyyy-MM-dd")}
							onChange={(ev) => {
								if (
									isAfter(parseISO(ev.target.value), new Date(booking.checkOut))
								) {
									setBooking({
										...booking,
										checkIn: ev.target.value,
										checkOut: addDays(new Date(ev.target.value), 1),
									});
								} else {
									setBooking({
										...booking,
										checkIn: ev.target.value,
									});
								}
							}}
						/>
					</div>
					<div className="flex-1 px-4 py-3 md:border-l">
						<label>退房:</label>
						<input
							type="date"
							value={format(new Date(booking.checkOut), "yyyy-MM-dd")}
							min={
								format(addDays(new Date(booking.checkIn), 1), "yyyy-MM-dd") ||
								currentDate
							}
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
