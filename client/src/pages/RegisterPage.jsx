import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../state/slices/notificationSlice";
import Notification from "../components/Notification";

export default function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const notification = useSelector((state) => state.notification);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	async function registerUser(data) {
		try {
			await axios.post("/register", data);
			navigate("/login");
			dispatch(showNotification({ type: "success", message: "註冊成功" }));
		} catch (e) {
			dispatch(showNotification({ type: "error", message: "註冊失敗" }));
		}
	}

	return (
		<div className="flex items-center justify-around mt-4 grow">
			<div className="mb-64">
				<h1 className="mb-4 text-4xl text-center">註冊帳號</h1>
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
						<span className="text-red-500">{errors.name.message}</span>
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
						<span className="text-red-500">{errors.email.message}</span>
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
						<span className="text-red-500">{errors.password.message}</span>
					)}

					<button className="mt-2 primary">註冊</button>

					<div className="py-2 text-center text-gray-500">
						已擁有帳號?{" "}
						<Link className="ml-2 text-black underline" to={"/login"}>
							登入
						</Link>
					</div>
				</form>
			</div>
			{/* Notification */}
			{notification && (
				<Notification type={notification.type} message={notification.message} />
			)}
		</div>
	);
}
