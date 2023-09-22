const UserInfo = ({ user, logoutUser }) => (
	<div className="max-w-lg mx-auto text-center">
		Logged in as {user?.name} ({user?.email})
		<button onClick={logoutUser} className="max-w-sm mt-2 text-white primary">
			Logout
		</button>
	</div>
);

export default UserInfo;
