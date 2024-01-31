import { Icon } from "@iconify/react";

export default function PerkItem({
	name,
	icon,
	text,
	isSelected = false,
	onCbClick = () => {},
}) {
	return (
		<div
			className={`flex items-center gap-2 px-4 py-8 border-2 cursor-pointer rounded-2xl ${
				isSelected ? "border-black bg-gray-100" : ""
			}`}
			onClick={() =>
				onCbClick({ target: { checked: !isSelected, name: name } })
			}
		>
			<input
				type="checkbox"
				name={name}
				checked={isSelected}
				className="hidden form-checkbox"
				onChange={onCbClick}
			/>
			<Icon icon={`mdi:${icon}`} />
			<span>{text}</span>
		</div>
	);
}
