import PerkItem from "./UI/PerkItem";
import { roomRangeList } from "../data/PlaceFormData";

export default function RoomType({ selectedRoomRange, onChange }) {
	function handleCbClick(ev) {
		const { name } = ev.target;
		onChange(name);
	}

	return (
		<>
			{roomRangeList.map((roomRange) => (
				<PerkItem
					key={roomRange.name}
					name={roomRange.name}
					icon={roomRange.icon}
					text={roomRange.text}
					isSelected={selectedRoomRange === roomRange.name}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
}
