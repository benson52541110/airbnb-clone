import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

interface User {
	id: string;
	name: string;
	email: string;
}

interface UserState {
	user: User | null;
	ready: boolean;
	error: string | null | undefined;
}

const initialState: UserState = {
	user: null,
	ready: false,
	error: null,
};

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
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		setReady: (state, action: PayloadAction<boolean>) => {
			state.ready = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.ready = false;
			})
			.addCase(
				fetchUserProfile.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload;
					state.ready = true;
				}
			)
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.error = action.payload;
				state.ready = true;
			});
	},
});

export const { setUser, setReady } = userSlice.actions;

export default userSlice.reducer;
