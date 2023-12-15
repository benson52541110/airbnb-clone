import { Route } from "react-router-dom";
import IndexPage from "../pages/IndexPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import PlacesPage from "../pages/PlacesPage.jsx";
import PlacesFormPage from "../pages/PlacesForm.jsx";
import PlacePage from "../pages/PlacePage.jsx";
import BookingsPage from "../pages/BookingsPage.jsx";
import BookingPage from "../pages/BookingPage.jsx";
import Wishlists from "../pages/Wishlists.jsx";
import Layout from "../components/Layout.jsx";

export const routes = (
	<Route path="/" element={<Layout />}>
		<Route index element={<IndexPage />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="/register" element={<RegisterPage />} />
		<Route path="/account/places" element={<PlacesPage />} />
		<Route path="/account/places/new" element={<PlacesFormPage />} />
		<Route path="/account/places/:id" element={<PlacesFormPage />} />
		<Route path="/place/:id" element={<PlacePage />} />
		<Route path="/account/wishlists" element={<Wishlists />} />
		<Route path="/account/bookings" element={<BookingsPage />} />
		<Route path="/account/bookings/:id" element={<BookingPage />} />
	</Route>
);
