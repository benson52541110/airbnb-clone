import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="flex flex-col min-h-screen px-20 mx-auto min-w-screen">
			<Header />
			<Outlet />
		</div>
	);
}
