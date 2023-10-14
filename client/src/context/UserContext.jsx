import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [ready, setReady] = useState(false);
	const fetchUserProfile = async () => {
		if (!user) {
			const { data } = await axios.get("/profile");
			setUser(data);
			setReady(true);
		}
	};
	useEffect(() => {
		fetchUserProfile();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, ready }}>
			{children}
		</UserContext.Provider>
	);
}
