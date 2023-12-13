import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Favorite = ({ landlord }) => {
	const [selected, setSelected] = useState(false);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const toggleFill = () => {
		const newSelected = !selected;
		setSelected(newSelected);

		if (newSelected) {
			// 如果現在是選中狀態，添加到收藏
			dispatch(updateFavorites([...favorites, landlord]));
		} else {
			// 如果取消選中，從收藏中移除
			dispatch(
				updateFavorites(favorites.filter((item) => item.id !== landlord.id))
			);
		}
	};

	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill={selected ? "pink" : "gray"}
			stroke="white"
			strokeWidth="2"
			xmlns="http://www.w3.org/2000/svg"
			onClick={toggleFill}
		>
			<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
		</svg>
	);
};

export default Favorite;
