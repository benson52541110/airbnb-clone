import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import PlacesPage from "./PlacesPage.jsx";

export default function ProfilePage() {
	const [redirect, setRedirect] = useState(null);
	const { ready, user, setUser } = useContext(UserContext);
	let { subpage } = useParams();
	if (subpage === undefined) {
		subpage = "profile";
	}

	if (!ready) {
		return "Loading...";
	}

	if (ready && !user && !redirect) {
		return <Navigate to={"/login"} />;
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return <div>{subpage === "places" && <PlacesPage />}</div>;
}
