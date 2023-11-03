import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "../utils/axios.js";
import { useForm, Controller } from "react-hook-form";
import Notification from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setUser, fetchUserProfile } from "../features/user/userSlice";

export default function LoginPage() {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	const [redirect, setRedirect] = useState(false);
	const dispatch = useDispatch();
	const { user, error, ready } = useSelector((state) => state.user);
	const [notification, setNotification] = useState({ type: "", message: "" });

	async function handleLoginSubmit(formData) {
		const { email, password } = formData;
		try {
			const { data: userData } = await axios.post("/login", {
				email,
				password,
			});
			dispatch(setUser(userData));
			setNotification({ type: "success", message: "登入成功" });
			setRedirect(true);
		} catch (e) {
			setNotification({ type: "error", message: "登入失敗" });
		}
	}

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="flex items-center justify-around mt-4 grow">
			<div className="mb-64">
				<h1 className="mb-4 text-4xl text-center">登入</h1>
				<form
					className="max-w-md mx-auto"
					onSubmit={handleSubmit(handleLoginSubmit)}
				>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						rules={{
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: "Invalid email address",
							},
						}}
						render={({ field }) => (
							<input type="email" placeholder="your@email.com" {...field} />
						)}
					/>
					{errors.email && (
						<span className="text-red-500 ">{errors.email.message}</span>
					)}

					<Controller
						name="password"
						control={control}
						defaultValue=""
						rules={{
							required: "Password is required",
							pattern: {
								value: /^[A-Za-z0-9]+$/i,
								message: "Password should only contain letters and numbers",
							},
						}}
						render={({ field }) => (
							<input type="password" placeholder="password" {...field} />
						)}
					/>
					{errors.password && (
						<span className="text-red-500 ">{errors.password.message}</span>
					)}
					<button className="mt-2 primary">登入</button>
					<div className="py-2 text-center text-gray-500">
						還沒擁有帳號嗎?
						<Link className="ml-2 text-black underline" to={"/register"}>
							註冊
						</Link>
					</div>
				</form>
				{notification.message && (
					<Notification
						type={notification.type}
						message={notification.message}
					/>
				)}
			</div>
		</div>
	);
}
