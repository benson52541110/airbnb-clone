import Navbar from "./components/Navbar";

import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="flex flex-col px-10">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default Layout;
