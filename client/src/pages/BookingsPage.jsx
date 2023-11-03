import { useEffect, useState } from "react";
import axios from "../utils/axios";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";

export default function BookingsPage() {
	const [bookings, setBookings] = useState([]);
	useEffect(() => {
		axios.get("/bookings").then((response) => {
			setBookings(response.data);
		});
	}, []);
	return (
		<div>
			<div>
				{bookings?.length > 0 &&
					bookings.map((booking) => (
						<Link
							to={`/account/bookings/${booking._id}`}
							className="flex gap-4 overflow-hidden bg-gray-200 rounded-2xl"
						>
							<div className="w-48">
								<PlaceImg place={booking.place} />
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
					))}
			</div>
		</div>
	);
}
