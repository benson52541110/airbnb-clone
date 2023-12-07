import PerkItem from "./UI/PerkItem";
import {
	roomRangeList,
	roomTypeList,
	roomCategoryList,
} from "../data/PlaceFormData";

export default function RoomType({ title, selected, onChange }) {
	const roomLists = {
		roomRange: roomRangeList,
		roomType: roomTypeList,
		roomCategory: roomCategoryList,
	};

	function handleCbClick(ev) {
		const { name } = ev.target;
		onChange(name);
	}

	return (
		<>
			{roomLists[title]?.map((room) => (
				<PerkItem
					key={room.name}
					name={room.name}
					icon={room.icon}
					text={room.text}
					isSelected={selected === room.name}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
}
