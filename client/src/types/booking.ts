import { Place } from "./place";

export interface Booking {
	_id: string;
	place: Place;
	user: string;
	checkIn: Date;
	checkOut: Date;
	name: string;
	phone: string;
	price: number;
}
