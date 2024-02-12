import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../state/slices/notificationSlice";

interface NotificationState {
	visible: boolean;
	message: string;
	type: "success" | "error";
}

interface RootState {
	notification: NotificationState;
}

const Notification: React.FC = () => {
	const dispatch = useDispatch();
	const notification = useSelector((state: RootState) => state.notification);

	useEffect(() => {
		if (notification.visible) {
			const timer = setTimeout(() => {
				dispatch(hideNotification());
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [notification.visible, dispatch]);

	if (!notification.visible) return null;

	const bgColor = {
		success: "bg-green-100",
		error: "bg-red-100",
	};

	const textColor = {
		success: "text-green-700",
		error: "text-red-700",
	};

	return (
		<div
			className={`py-4 px-8 fixed top-24 right-24 text-sm rounded-lg z-50 ${
				bgColor[notification.type]
			} ${textColor[notification.type]}`}
			role="alert"
		>
			{notification.message}
		</div>
	);
};

export default Notification;
