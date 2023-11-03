import { Routes } from "react-router-dom";
import { routes } from "./routes/index.jsx";
import { UserContextProvider } from "./context/UserContext";

function App() {
	return (
		<UserContextProvider>
			<Routes>{routes}</Routes>
		</UserContextProvider>
	);
}

export default App;
