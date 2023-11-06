import { Icon } from "@iconify/react";

export default function ItemSelect({ list, isSelected, onCbClick }) {
	return (
		<div
			className={`flex items-center gap-2 px-4 py-8 border cursor-pointer rounded-2xl ${
				isSelected ? "border-black bg-gray-100" : ""
			}`}
			onClick={() =>
				onCbClick({ target: { checked: !isSelected, name: list.name } })
			}
		>
			<input
				type="checkbox"
				name={list.name}
				checked={isSelected}
				className="hidden form-checkbox"
				onChange={onCbClick}
			/>
			<Icon icon={list.icon} />
			<span>{list.text}</span>
		</div>
	);
}
