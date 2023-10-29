import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

export default function RegisterPage() {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	async function registerUser(ev) {
		ev.preventDefault();
		try {
			await axios.post("/register", {
				name,
				email,
				password,
			});
			alert("Registration successful. Now you can log in");
		} catch (e) {
			alert("Registration failed. Please try again later");
		}
	}
	return (
		<div className="flex items-center justify-around mt-4 grow">
			<div className="mb-64">
				<h1 className="mb-4 text-4xl text-center">Sign up</h1>
				<form
					className="max-w-md mx-auto"
					onSubmit={handleSubmit(registerUser)}
				>
					<Controller
						name="name"
						control={control}
						defaultValue=""
						rules={{
							required: "Name is required",
						}}
						render={({ field }) => (
							<input type="text" placeholder="benson" {...field} />
						)}
					/>
					{errors.name && (
						<span className="text-red-500 ">{errors.name.message}</span>
					)}
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
					<button className="mt-2 primary">Sign up</button>
					<div className="py-2 text-center text-gray-500">
						Don't have an account yet?{" "}
						<Link className="text-black underline" to={"/login"}>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
