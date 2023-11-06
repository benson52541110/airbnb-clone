import ItemSelect from "./UI/ItemSelect";

export default function Perks({ perks, onChange }) {
	function handleCbClick(ev) {
		const { checked, name } = ev.target;
		if (checked) {
			onChange([...perks, name]);
		} else {
			onChange([...perks.filter((valueName) => valueName !== name)]);
		}
	}
	const perksList = [
		{ name: "wifi", icon: "mdi:wifi", text: "Wifi" },
		{ name: "parking", icon: "mdi:parking", text: "免費停車場" },
		{ name: "tv", icon: "mdi:tv", text: "電視" },
		{ name: "audio", icon: "mdi:audio", text: "音響" },
		{ name: "pets", icon: "mdi:pets", text: "寵物" },
		{ name: "entrance", icon: "mdi:door", text: "私人入口" },
	];
	return (
		<>
			{perksList.map((perk) => (
				<ItemSelect
					key={perk.name}
					list={perk}
					isSelected={perks.includes(perk.name)}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
}
