import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
	const { user } = useSelector((state: any) => state.user);

	if (!user) {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};

export default RequireAuth;
