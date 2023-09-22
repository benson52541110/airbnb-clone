import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import Places from "../components/Places";

const Account = () => {
	const { user, setUser, ready } = useContext(UserContext);
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const { subpage = "profile" } = useParams();

	useEffect(() => {
		if (ready && !user) {
			setShouldRedirect(true);
		}
	}, [ready, user]);

	if (!ready) return <div>Loading...</div>;
	if (shouldRedirect) return <Navigate to="/" />;

	const activeClass = (type) =>
		`inline-flex gap-1 items-center py-2 px-6 rounded-full  ${
			type === subpage ? "bg-primary text-white " : "bg-gray-200"
		}`;

	const logoutUser = async () => {
		await axios.post("/logout");
		setShouldRedirect(true);
		setUser(null);
	};

	return (
		<div>
			<Navigation activeClass={activeClass} />
			{subpage === "profile" && (
				<UserInfo user={user} logoutUser={logoutUser} />
			)}
			{subpage === "places" && <Places user={user} />}
		</div>
	);
};

const Navigation = ({ activeClass }) => (
	<nav className="flex justify-center w-full gap-2 my-8 ">
		<Link className={activeClass("profile")} to="/account">
			<Icon icon="iconamoon:profile" />
			My profile
		</Link>
		<Link className={activeClass("bookings")} to="/account/bookings">
			<Icon icon="material-symbols:order-approve-outline" />
			My bookings
		</Link>
		<Link className={activeClass("places")} to="/account/places">
			<Icon icon="solar:home-broken" />
			My accommodations
		</Link>
	</nav>
);

export default Account;
