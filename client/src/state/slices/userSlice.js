// features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUserProfile = createAsyncThunk(
	"user/fetchUserProfile",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get("/profile");
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		ready: false,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setReady: (state, action) => {
			state.ready = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.ready = false;
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.user = action.payload;
				state.ready = true;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.error = action.payload;
				state.ready = true;
			});
	},
});

export const { setUser, setReady } = userSlice.actions;

export default userSlice.reducer;
