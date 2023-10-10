import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";

import Main from "./pages/Main";
import axios from "axios";
import Account from "./pages/Account";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(axios.defaults.baseURL);
axios.defaults.withCredentials = true;
function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="/account/:subpage?" element={<Account />} />
					<Route path="/account/:subpage/:action" element={<Account />} />
				</Route>
			</Routes>
		</UserContextProvider>
	);
}

export default App;
