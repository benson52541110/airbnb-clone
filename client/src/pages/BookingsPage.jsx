import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import BookingDates from "../components/BookingDates";
import axios from "../utils/axios";

export default function BookingsPage() {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		axios.get("/bookings").then((response) => {
			setBookings(response.data);
		});
	}, []);

	const deleteBooking = (event, bookingId) => {
		event.stopPropagation();
		axios
			.delete(`/bookings/${bookingId}`)
			.then(() => {
				setBookings(bookings.filter((booking) => booking._id !== bookingId));
			})
			.catch((err) => {
				console.error("刪除預訂時出錯：", err);
			});
	};

	return (
		<div className="grid grid-cols-2 gap-8 mt-4">
			{bookings?.length > 0 &&
				bookings.map((booking) => (
					<div key={booking._id} className="relative ">
						<Link
							to={`/account/bookings/${booking._id}`}
							className="flex gap-4 overflow-hidden bg-gray-200 rounded-2xl"
						>
							<div className="w-48 p-2">
								<Image
									className="object-cover w-full h-full rounded-2xl aspect-square"
									src={booking.place.photos[0]}
								/>
							</div>
							<div className="py-3 pr-3 grow">
								<h2 className="text-xl">{booking.place.title}</h2>
								<div className="text-xl">
									<BookingDates
										booking={booking}
										className="mt-4 mb-2 text-gray-500"
									/>
									<div className="flex gap-1">
										<span className="text-2xl">總價: ${booking.price}</span>
									</div>
								</div>
							</div>
						</Link>
						<Icon
							className="absolute text-lg cursor-pointer top-2 right-2 hover:bg-gray-300"
							onClick={(e) => deleteBooking(e, booking._id)}
							icon="mdi:close"
						></Icon>
					</div>
				))}
		</div>
	);
}
