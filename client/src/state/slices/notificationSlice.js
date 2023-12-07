import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		type: "",
		message: "",
		visible: false,
	},
	reducers: {
		showNotification: (state, action) => {
			state.type = action.payload.type;
			state.message = action.payload.message;
			state.visible = true;
		},
		hideNotification: (state) => {
			state.type = "";
			state.message = "";
			state.visible = false;
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
