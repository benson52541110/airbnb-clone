const Modal = ({ onClose, onDelete, onEdit }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="p-6 transition-all duration-500 ease-out transform translate-y-full bg-white rounded-lg shadow-lg">
				<button
					className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
					onClick={onEdit}
				>
					編輯
				</button>
				<button
					className="px-4 py-2 ml-4 text-white bg-red-500 rounded hover:bg-red-600"
					onClick={onDelete}
				>
					刪除
				</button>
				<button
					className="px-4 py-2 ml-4 bg-gray-300 rounded hover:bg-gray-400"
					onClick={onClose}
				>
					關閉
				</button>
			</div>
		</div>
	);
};

export default Modal;
