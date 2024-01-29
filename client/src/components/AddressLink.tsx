import { Icon } from "@iconify/react";

interface AddressLinkProps {
	children: string;
	className?: string;
}

const AddressLink: React.FC<AddressLinkProps> = ({ children }) => {
	return (
		<a
			className="flex items-center my-3"
			target="_blank"
			href={`https://maps.google.com/?q=${children}`}
			rel="noreferrer"
		>
			<Icon icon="bxs:map" />
			{children}
		</a>
	);
};

export default AddressLink;
