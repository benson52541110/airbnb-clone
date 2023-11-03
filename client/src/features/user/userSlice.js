import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUserProfile = createAsyncThunk(
	"user/fetchUserProfile",
	async () => {
		const response = await axios.get("/profile");
		return response.data;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		ready: false,
		status: "idle",
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload;
				state.ready = true;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
