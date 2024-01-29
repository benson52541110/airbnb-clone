import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import axios from "../utils/axios";

export default function BookingPage() {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);

	useEffect(() => {
		if (id) {
			axios.get("/bookings").then((response) => {
				const foundBooking = response.data.find(({ _id }) => _id === id);
				if (foundBooking) {
					setBooking(foundBooking);
				}
			});
		}
	}, [id]);

	if (!booking) {
		return "";
	}

	return (
		<div className="my-8">
			<h1 className="text-3xl">{booking.place.title}</h1>
			<AddressLink>{booking.place.address}</AddressLink>
			<div className="flex items-center justify-between p-6 my-6 bg-gray-200 rounded-2xl">
				<div>
					<h2 className="mb-4 text-2xl">您的訂房資訊:</h2>
					<BookingDates booking={booking} />
				</div>
				<div className="flex items-center p-6 text-white bg-primary rounded-2xl">
					<div>總價</div>
					<div className="ml-1 text-3xl">${booking.price}</div>
				</div>
			</div>
			<PlaceGallery place={booking.place} />
		</div>
	);
}
