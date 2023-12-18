import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
	return (
		<div className="relative flex flex-col min-h-screen px-5 mx-auto min-w-screen md:px-20">
			<Header />
			<Outlet />
		</div>
	);
}
