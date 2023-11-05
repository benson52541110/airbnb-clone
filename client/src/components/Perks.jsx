import { Icon } from "@iconify/react";
export default function Perks({ perks, onChange }) {
	function handleCbClick(ev) {
		const { checked, name } = ev.target;
		if (checked) {
			onChange([...perks, name]);
		} else {
			onChange([...perks.filter((valueName) => valueName !== name)]);
		}
	}
	return (
		<>
			<label className="flex items-center gap-2 p-4 border cursor-pointer rounded-2xl">
				<input
					type="checkbox"
					checked={perks.includes("wifi")}
					name="wifi"
					onChange={handleCbClick}
				/>
				<Icon icon="mdi:wifi" />
				<span>Wifi</span>
			</label>
			<label className="flex items-center gap-2 p-4 border cursor-pointer rounded-2xl">
				<input
					type="checkbox"
					checked={perks.includes("parking")}
					name="parking"
					onChange={handleCbClick}
				/>
				<Icon icon="mdi:parking" />
				<span>免費停車場</span>
			</label>
			<label className="flex items-center gap-2 p-4 border cursor-pointer rounded-2xl">
				<input
					type="checkbox"
					checked={perks.includes("tv")}
					name="tv"
					onChange={handleCbClick}
				/>
				<Icon icon="mdi:tv" />
				<span>電視</span>
			</label>
			<label className="flex items-center gap-2 p-4 border cursor-pointer rounded-2xl">
				<input
					type="checkbox"
					checked={perks.includes("audio")}
					name="audio"
					onChange={handleCbClick}
				/>
				<Icon icon="mdi:audio" />
				<span>音響</span>
			</label>
			<label className="flex items-center gap-2 p-4 border cursor-pointer rounded-2xl">
				<input
					type="checkbox"
					checked={perks.includes("pets")}
					name="pets"
					onChange={handleCbClick}
				/>
				<Icon icon="mdi:pets" />
				<span>寵物</span>
			</label>
			<label className="flex items-center gap-2 p-4 border cursor-pointer rounded-2xl">
				<input
					type="checkbox"
					checked={perks.includes("entrance")}
					name="entrance"
					onChange={handleCbClick}
				/>
				<Icon icon="mdi:door" />
				<span>私人入口</span>
			</label>
		</>
	);
}
