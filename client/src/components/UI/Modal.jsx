import { Icon } from "@iconify/react";

const Modal = ({ onClose, onDelete, onEdit }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50">
			<div className="relative flex flex-col p-20 bg-white rounded-lg shadow-lg animate__animated animate__slideInUp animate__faster">
				<button
					className="px-4 py-2 text-3xl font-bold text-white bg-black rounded"
					onClick={onEdit}
				>
					編輯房源
				</button>
				<button
					className="px-4 py-2 mt-6 text-3xl font-bold text-white bg-black rounded"
					onClick={onDelete}
				>
					刪除房源
				</button>
				<Icon
					className="absolute text-lg cursor-pointer top-2 left-2 hover:bg-gray-300"
					onClick={() => onClose()}
					icon="mdi:close"
				></Icon>
			</div>
		</div>
	);
};

export default Modal;
