import PerkItem from "./UI/PerkItem";
import {
	servicesList,
	roomRangeList,
	roomTypeList,
	roomCategoryList,
} from "../data/PlaceFormData";

export default function ListSelection({
	selectedItems,
	onChange,
	title,
	isMultiSelect = false,
}) {
	const listTypes = {
		services: servicesList,
		roomRange: roomRangeList,
		roomType: roomTypeList,
		roomCategory: roomCategoryList,
	};
	function handleCbClick(ev) {
		const { checked, name } = ev.target;
		if (isMultiSelect) {
			if (checked) {
				onChange([...selectedItems, name]);
			} else {
				onChange([...selectedItems.filter((itemName) => itemName !== name)]);
			}
			return;
		} else {
			if (checked) {
				onChange(name);
			} else {
				onChange(null);
			}
		}
	}

	return (
		<>
			{listTypes[title]?.map((item) => (
				<PerkItem
					key={item.name}
					list={item}
					name={item.name}
					icon={item.icon}
					text={item.text}
					isSelected={
						isMultiSelect
							? selectedItems.includes(item.name)
							: selectedItems === item.name
					}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
}
