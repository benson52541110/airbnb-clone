import { Icon } from "@iconify/react";

interface AddressLinkProps {
	children: string;
}

const AddressLink: React.FC<AddressLinkProps> = ({ children }) => {
	return (
		<a
			className="inline-flex items-center my-3 hover:text-gray-600"
			target="_blank"
			href={`https://maps.google.com/?q=${encodeURIComponent(children)}`}
			rel="noreferrer"
		>
			<Icon icon="bxs:map" />
			{children}
		</a>
	);
};

export default AddressLink;
