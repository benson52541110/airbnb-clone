import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";

import Main from "./pages/Main";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Main />} />
			</Route>
		</Routes>
	);
}

export default App;
