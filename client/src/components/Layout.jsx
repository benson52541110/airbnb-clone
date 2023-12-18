import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
	return (
		<div className="relative flex flex-col min-h-screen px-20 mx-auto min-w-screen">
			<Header />
			<Outlet />
		</div>
	);
}
