import { useRef, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import axios from "axios";

const customStyles = {
	content: {
		top: "auto",
		left: "50%",
		right: "auto",
		bottom: "-100%",
		transform: "translateX(-50%)",
		transition: "bottom 0.5s ease-out",
		minWidth: "568px",
		minHeight: "80vh",
		overflow: "hidden",
		padding: "0px",
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)", // 暗灰色背景
	},
};

Modal.setAppElement("html");

const Login = ({ modalIsOpen, closeModal }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const subtitle = useRef(null);

	const afterOpenModal = () => {
		if (subtitle.current) {
			subtitle.current.parentElement.style.bottom = "20%";
		}
	};
	const registerUser = (e) => {
		e.preventDefault();
		axios.post("/register", {
			name,
			email,
			password,
		});
	};

	const loginUser = (e) => {
		e.preventDefault();
		axios.post("/test", {
			name,
			email,
			password,
		});
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
						<form onSubmit={isLogin ? loginUser : registerUser}>
							{!isLogin && (
								<input
									type="name"
									placeholder="name"
									value={name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							)}

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

							<button className="primary">
								{isLogin ? "Login" : "Sign up"}
							</button>
							{isLogin ? (
								<div className="mt-3 text-center">
									Don't have a account yet?
									<span
										className="ml-2 text-black underline cursor-pointer"
										onClick={() => {
											setIsLogin(false);
										}}
									>
										Sign up
									</span>
								</div>
							) : (
								<div className="mt-3 text-center">
									Already a member?
									<span
										className="ml-2 text-black underline cursor-pointer"
										onClick={() => {
											setIsLogin(true);
										}}
									>
										Login
									</span>
								</div>
							)}
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Login;
