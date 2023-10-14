import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./components/Layout";
import Register from "./pages/Register.jsx";
import axios from "axios";
import Profile from "./pages/Profile.jsx";
import Places from "./pages/Places.jsx";
import PlacesForm from "./pages/PlacesForm.jsx";
import Place from "./pages/Place.jsx";
import Bookings from "./pages/Bookings.jsx";
import Booking from "./pages/Booking.jsx";

import { UserContextProvider } from "./context/UserContext";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Index />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/account" element={<Profile />} />
					<Route path="/account/places" element={<Places />} />
					<Route path="/account/places/new" element={<PlacesForm />} />
					<Route path="/account/places/:id" element={<PlacesForm />} />
					<Route path="/place/:id" element={<Place />} />
					<Route path="/account/bookings" element={<Bookings />} />
					<Route path="/account/bookings/:id" element={<Booking />} />
				</Route>
			</Routes>
		</UserContextProvider>
	);
}

export default App;
