import { useRef, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

const customStyles = {
	content: {
		top: "auto",
		left: "50%",
		right: "auto",
		bottom: "-100%",
		transform: "translateX(-50%)",
		transition: "bottom 0.5s ease-out",
		minWidth: "568px",
		maxHeight: "80vh",
		overflow: "hidden",
		padding: "0px",
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)", // 暗灰色背景
	},
};

Modal.setAppElement("html");

const Login = ({ modalIsOpen, closeModal }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const subtitle = useRef(null);

	const afterOpenModal = () => {
		if (subtitle.current) {
			subtitle.current.parentElement.style.bottom = "40%";
		}
	};

	return (
		<div>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="flex flex-col px-6" ref={subtitle}>
					<div className="flex items-center h-16 border-b">
						<Icon
							icon="material-symbols:close"
							className="cursor-pointer "
							onClick={closeModal}
						/>
						<div className="text-center grow">Log in or sign up</div>
					</div>
					<div className="py-6">
						<div>Welcome to Airbnb</div>
						<form>
							<input
								type="email"
								placeholder="guest@email.com"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
							<input
								type="password"
								placeholder="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<button className="primary">Continue</button>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Login;
