import axios, { AxiosInstance } from "axios";

const baseURL: string | undefined = import.meta.env.VITE_API_BASE_URL;

const instance: AxiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

export default instance;
