import PerkItem from "./UI/PerkItem";
import { roomTypeList } from "../data/PlaceFormData";

export default function RoomType({ selectedRoomType, onChange }) {
	function handleCbClick(ev) {
		const { name } = ev.target;
		onChange(name);
	}

	return (
		<>
			{roomTypeList.map((roomType) => (
				<PerkItem
					key={roomType.name}
					name={roomType.name}
					icon={roomType.icon}
					text={roomType.text}
					isSelected={selectedRoomType === roomType.name}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
}
