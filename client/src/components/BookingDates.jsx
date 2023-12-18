import { format } from "date-fns";
import { Icon } from "@iconify/react";

export default function BookingDates({ booking, className }) {
	return (
		<div className={"flex flex-col gap-1 " + className}>
			<div className="flex items-center gap-1">
				<Icon icon="ion:calendar" />
				{format(new Date(booking.checkIn), "yyyy-MM-dd")}~
			</div>

			<div className="flex items-center gap-1">
				<Icon icon="ion:calendar" />
				{format(new Date(booking.checkOut), "yyyy-MM-dd")}
			</div>
		</div>
	);
}
