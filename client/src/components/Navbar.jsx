import { Link } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Login from "./Login";

const Navbar = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleOpenModal = () => {
		setModalIsOpen(true);
	};

	const handleCloseModal = () => {
		setModalIsOpen(false);
	};
	return (
		<>
			<div className="items-center justify-between hidden h-20 border-b md:flex">
				<div className="flex">
					<div
						className="w-8 h-8 bg-cover"
						style={{ backgroundImage: `url('/assets/logo.svg')` }}
					></div>
					<div className="items-center hidden pl-2 font-extrabold text-primary xl:flex">
						airbnb
					</div>
				</div>

				<div className="md:w-[360px]  rounded-full border-2 flex mx-6 py-[10px] pr-3 items-center">
					<div className="flex">
						<button className="px-4 whitespace-nowrap ">Anywhere</button>
						<span className=" h-6 w-[1px] bg-gray-300"></span>
						<button className="px-4 whitespace-nowrap">Any week</button>
						<span className=" h-6 w-[1px] bg-gray-300"></span>
						<button className="px-4 whitespace-nowrap">Add guest</button>
					</div>

					<div className="flex items-center justify-center rounded-full bg-primary aspect-square w-7 h-7">
						<Icon
							icon="material-symbols:search"
							className="w-3 h-3 text-white "
						/>
					</div>
				</div>
				<div className="flex items-center">
					<div className="w-[148px]">Become a host</div>
					<div className="bg-white w-[46px]">
						<Icon icon="ci:globe" className="text-base" color="black" />
					</div>
					<div
						className="flex items-center justify-between p-2 border rounded-3xl w-[77px] cursor-pointer"
						onClick={handleOpenModal}
					>
						<Icon icon="material-symbols:menu" width="16" height="16" />
						<div
							className="w-[30px] h-[30px] ml-3 rounded-full aspect-square bg-center"
							style={{ backgroundImage: `url('/assets/guest.svg')` }}
						></div>
					</div>
				</div>
			</div>
			<div className=" h-14 w-full mt-[14px] border rounded-2xl flex items-center px-5 py-2 justify-between md:hidden">
				<div className="flex items-center">
					<div>
						<Icon icon="material-symbols:search" className="w-4 h-4" />
					</div>
					<div className="flex flex-col ml-5">
						<div className="text-sm font-semibold">Anywhere</div>
						<div className="text-xs font-light">Any week ． Add guests</div>
					</div>
				</div>

				<div className="p-2 border rounded-full">
					<Icon icon="system-uicons:filtering" />
				</div>
			</div>
			<Login modalIsOpen={modalIsOpen} closeModal={handleCloseModal} />
		</>
	);
};

export default Navbar;