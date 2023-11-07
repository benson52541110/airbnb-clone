import { useState, useEffect } from "react";
function Notification({ type, message }) {
	const [visible, setVisible] = useState(true);
	const bgColor = {
		success: "bg-green-100",
		error: "bg-red-100",
	};

	const textColor = {
		success: "text-green-700",
		error: "text-red-700",
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, 2000);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		visible && (
			<div
				className={`py-4 px-8 fixed top-24 right-24 text-sm rounded-lg ${bgColor[type]} ${textColor[type]}`}
				role="alert"
			>
				{message}
			</div>
		)
	);
}
export default Notification;
