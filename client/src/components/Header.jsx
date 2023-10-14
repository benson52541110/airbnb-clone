import { Link, Navigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Icon } from "@iconify/react";
import axios from "axios";

export default function Header() {
	const [redirect, setRedirect] = useState(null);
	const { ready, user, setUser } = useContext(UserContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const modalRef = useRef(null);

	const handleCloseModal = (e) => {
		if (modalRef.current || !modalRef.current.contains(e.target)) {
			setIsModalOpen(false);
		}
	};
	async function logout() {
		await axios.post("/logout");
		setRedirect("/");
		setUser(null);
	}
	// if (ready && !user && !redirect) {
	// 	return <Navigate to={"/login"} />;
	// }

	// if (redirect) {
	// 	return <Navigate to={redirect} />;
	// }
	return (
		<header className="flex items-center justify-center w-full h-20 border-b md:justify-between">
			<Link to={"/"} className="flex items-center gap-1">
				<Icon icon="logos:airbnb-icon" className="hidden w-8 h-8 md:block" />
				<span className="hidden text-2xl font-medium text-red-500 xl:inline">
					airbnb
				</span>
			</Link>
			<div className="flex items-center gap-2 px-3 py-2 text-base border border-gray-300 rounded-full shadow-sm shadow-gray-300 ">
				<div className="mx-2">Anywhere</div>
				<div className="w-[1px] h-[24px] bg-gray-200"></div>
				<div className="mx-2">Any week</div>
				<div className="w-[1px] h-[24px] bg-gray-200"></div>
				<div className="mx-2 text-gray-400">Add guests</div>
				<button className="p-2 text-white rounded-full bg-primary">
					<Icon icon="material-symbols:search" />
				</button>
			</div>
			<div className="relative items-center hidden gap-2 px-4 py-2 border border-gray-300 rounded-full md:flex">
				<Icon icon="quill:hamburger" onClick={() => setIsModalOpen(true)} />
				{isModalOpen && !!user && (
					<div
						onClick={handleCloseModal}
						tabIndex="-1"
						aria-hidden="true"
						className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
					>
						<div
							className="absolute right-20 z-50 w-[240px] bg-white top-[72px] py-2 shadow-xl rounded-xl"
							style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.12)" }}
							ref={modalRef}
						>
							<Link
								to={"/account/bookings"}
								className="block px-4 py-3 cursor-pointer hover:bg-gray-100"
							>
								Booking
							</Link>
							<Link
								to={"/account/wishlists"}
								className="block px-4 py-3 cursor-pointer hover:bg-gray-100"
							>
								Wishlists
							</Link>
							<Link
								to={"/account/places"}
								className="block px-4 py-3 cursor-pointer hover:bg-gray-100"
							>
								Airbnb your home
							</Link>
							<Link
								to={"/account/profile"}
								className="block px-4 py-3 cursor-pointer hover:bg-gray-100"
							>
								Account
							</Link>
							<div
								className="px-4 py-3 cursor-pointer hover:bg-gray-100"
								onClick={logout}
							>
								Log out
							</div>
						</div>
					</div>
				)}
				{isModalOpen && !user && (
					<div
						onClick={handleCloseModal}
						tabIndex="-1"
						aria-hidden="true"
						className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
					>
						<div
							className="absolute right-20 z-50 w-[240px] bg-white top-[72px] py-2 shadow-xl rounded-xl"
							style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.12)" }}
							ref={modalRef}
						>
							<Link
								to={"/login"}
								className="block px-4 py-3 cursor-pointer hover:bg-gray-100"
							>
								Log in
							</Link>
							<Link
								to={"/register"}
								className="block px-4 py-3 cursor-pointer hover:bg-gray-100"
							>
								Sign up
							</Link>
						</div>
					</div>
				)}

				<div className="overflow-hidden text-white bg-gray-500 border border-gray-500 rounded-full">
					<Icon icon="bi:people-circle" className="w-6 h-6" />
				</div>
				{!!user && <div>{user.name}</div>}
			</div>
		</header>
	);
}
