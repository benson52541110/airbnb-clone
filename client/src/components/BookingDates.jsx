import { differenceInCalendarDays, format } from "date-fns";
import { Icon } from "@iconify/react";

export default function BookingDates({ booking, className }) {
	return (
		<div className={"flex gap-1 " + className}>
			{differenceInCalendarDays(
				new Date(booking.checkOut),
				new Date(booking.checkIn)
			)}
			天:
			<div className="flex items-center gap-1 ml-2">
				<Icon icon="ion:calendar" />
				{format(new Date(booking.checkIn), "yyyy-MM-dd")}
			</div>
			&rarr;
			<div className="flex items-center gap-1">
				<Icon icon="ion:calendar" />
				{format(new Date(booking.checkOut), "yyyy-MM-dd")}
			</div>
		</div>
	);
}
