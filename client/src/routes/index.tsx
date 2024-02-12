import { Route } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PlacesPage from "../pages/PlacesPage";
import PlacesFormPage from "../pages/PlacesForm";
import PlacePage from "../pages/PlacePage";
import BookingsPage from "../pages/BookingsPage";
import BookingPage from "../pages/BookingPage";
import Wishlists from "../pages/Wishlists";
import Layout from "../components/Layout";
import RequireAuth from "../components/RequireAuth";

export const routes = (
	<Route path="/" element={<Layout />}>
		<Route index element={<IndexPage />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="/register" element={<RegisterPage />} />
		<Route path="/place/:id" element={<PlacePage />} />
		<Route path="/account" element={<RequireAuth />}>
			<Route path="/account/places" element={<PlacesPage />} />
			<Route path="/account/places/new" element={<PlacesFormPage />} />
			<Route path="/account/places/:id" element={<PlacesFormPage />} />
			<Route path="/account/wishlists" element={<Wishlists />} />
			<Route path="/account/bookings" element={<BookingsPage />} />
			<Route path="/account/bookings/:id" element={<BookingPage />} />
		</Route>
	</Route>
);
