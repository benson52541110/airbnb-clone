import ItemSelect from "./UI/ItemSelect";

export default function RoomType({ selectedRoomRange, onChange }) {
	function handleCbClick(ev) {
		const { name } = ev.target;
		onChange(name);
	}

	const roomRangeList = [
		{ name: "home", icon: "mdi:home", text: "整套房源" },
		{ name: "domain", icon: "mdi:domain", text: "一個房間" },
		{ name: "bus", icon: "mdi:home-account", text: "含住房間" },
	];
	return (
		<>
			{roomRangeList.map((roomRange) => (
				<ItemSelect
					key={roomRange.name}
					list={roomRange}
					isSelected={selectedRoomRange === roomRange.name}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
}
