import PerkItem from "./UI/PerkItem";
import {
	servicesList,
	roomRangeList,
	roomTypeList,
	roomCategoryList,
} from "../data/PlaceFormData";

interface ListTypes {
	services: ListItem[];
	roomRange: ListItem[];
	roomType: ListItem[];
	roomCategory: ListItem[];
}

interface ListItem {
	name: string;
	icon: string;
	text: string;
	id: string;
}

interface ListSelectionProps {
	selectedItems: string[];
	onChange: (newSelectedItems: string[] | null) => void; // 回調函數的類型
	title: keyof ListTypes;
	isMultiSelect?: boolean;
}

const ListSelection: React.FC<ListSelectionProps> = ({
	selectedItems,
	onChange,
	title,
	isMultiSelect = false,
}) => {
	const listTypes = {
		services: servicesList,
		roomRange: roomRangeList,
		roomType: roomTypeList,
		roomCategory: roomCategoryList,
	};

	function handleCbClick(ev: React.ChangeEvent<HTMLInputElement>) {
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
				onChange([name]);
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
					isSelected={selectedItems?.includes(item.name)}
					onCbClick={handleCbClick}
				/>
			))}
		</>
	);
};

export default ListSelection;
