import { Icon } from "@iconify/react";

export default function AddressLink({ children, className = null }) {
	if (!className) {
		className = "block my-3";
	}
	className += " flex gap-1 font-semibold underline flex items-center";
	return (
		<a
			className={className}
			target="_blank"
			href={"https://maps.google.com/?q=" + children}
		>
			<Icon icon="bxs:map" />
			{children}
		</a>
	);
}
