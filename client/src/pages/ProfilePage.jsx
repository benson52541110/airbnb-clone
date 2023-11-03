import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import PlacesPage from "./PlacesPage.jsx";

export default function ProfilePage() {
	const [redirect, setRedirect] = useState(null);
	const { user, ready } = useSelector((state) => state.user);
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
