import { Icon } from "@iconify/react";

interface PerkItemProps {
	name: string;
	icon: string;
	text: string;
	isSelected?: boolean;
	onCbClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const PerkItem: React.FC<PerkItemProps> = ({
	name,
	icon,
	text,
	isSelected = false,
	onCbClick,
}) => {
	// 模擬 checkbox 更改事件
	const handleClick = () => {
		const event = { target: { checked: !isSelected, name } };
		onCbClick(event as unknown as React.MouseEvent<HTMLDivElement>);
	};
	return (
		<div
			className={`flex items-center gap-2 px-4 py-8 border-2 cursor-pointer rounded-2xl ${
				isSelected ? "border-black bg-gray-100" : ""
			}`}
			onClick={handleClick}
		>
			<input
				type="checkbox"
				name={name}
				checked={isSelected}
				className="hidden form-checkbox"
				onChange={
					onCbClick as unknown as React.ChangeEventHandler<HTMLInputElement>
				}
			/>
			<Icon icon={`mdi:${icon}`} />
			<span>{text}</span>
		</div>
	);
};

export default PerkItem;
