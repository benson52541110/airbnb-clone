import ItemSelect from "./UI/ItemSelect";

export default function RoomType({ selectedRoomType, onChange }) {
	function handleCbClick(ev) {
		const { name } = ev.target;
		onChange(name);
	}

	const roomTypeList = [
		{ name: "home", icon: "mdi:home", text: "獨棟房屋" },
		{ name: "domain", icon: "mdi:domain", text: "公寓" },
		{ name: "bus", icon: "mdi:bus-double-decker", text: "露營車" },
		{ name: "terrain", icon: "mdi:terrain", text: "洞穴" },
		{ name: "forest", icon: "mdi:forest", text: "小木屋" },
		{ name: "castle", icon: "mdi:castle", text: "城堡" },
	];
	return (
		<>
			{roomTypeList.map((roomType) => (
				<ItemSelect
					key={roomType.name}
					list={roomType}
					isSelected={selectedRoomType === roomType.name}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
}
