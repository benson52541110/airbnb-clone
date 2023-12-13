import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state/slices/userSlice.js";
import axios from "../../utils/axios.js";

const Favorite = ({ id }) => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const isFavorite = user && user.favorites.includes(id);
	const [selected, setSelected] = useState(isFavorite);

	const toggleFill = () => {
		if (!user) {
			return;
		}

		const newSelected = !selected;
		setSelected(newSelected);
		let updatedFavorites = newSelected
			? [...user.favorites, id]
			: user.favorites.filter((fav) => fav !== id);
		axios
			.put("/favorites", {
				...user,
				favorites: updatedFavorites,
			})
			.then((res) => {
				dispatch(setUser(res.data));
			});
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