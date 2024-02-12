import { Place } from "./place";

export interface Booking {
	_id?: string;
	place?: Place;
	user?: string;
	checkIn: Date | string;
	checkOut: Date | string;
	numberOfGuests: number;
	name: string;
	phone: string;
	price?: number;
}
