import PerkItem from "./UI/PerkItem";
import { perksList } from "../data/PlaceFormData";

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
			{perksList.map((perk) => (
				<PerkItem
					key={perk.name}
					list={perk}
					name={perk.name}
					icon={perk.icon}
					text={perk.text}
					isSelected={perks.includes(perk.name)}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
}
