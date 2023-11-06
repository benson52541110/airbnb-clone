import { Routes } from "react-router-dom";
import { routes } from "./routes/index.jsx";
import { Provider } from "react-redux";
import { store } from "./state/store.js";

function App() {
	return (
		<Provider store={store}>
			<Routes>{routes}</Routes>
		</Provider>
	);
}

export default App;
