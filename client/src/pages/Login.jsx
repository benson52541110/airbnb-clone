import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";
import { useForm, Controller } from "react-hook-form";

export default function LoginPage() {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	const [redirect, setRedirect] = useState(false);
	const { setUser } = useContext(UserContext);

	async function handleLoginSubmit(formData) {
		const { email, password } = formData;
		try {
			const { data: userData } = await axios.post("/login", {
				email,
				password,
			});
			setUser(userData);
			alert("Login successful");
			setRedirect(true);
		} catch (e) {
			alert("Login failed");
		}
	}

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="flex items-center justify-around mt-4 grow">
			<div className="mb-64">
				<h1 className="mb-4 text-4xl text-center">Login</h1>
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
					<button className="mt-2 primary">Login</button>
					<div className="py-2 text-center text-gray-500">
						Don't have an account yet?{" "}
						<Link className="text-black underline" to={"/register"}>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
