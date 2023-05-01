import {createSlice} from "@reduxjs/toolkit";
import notification from "../components/Notification";
// make the notification dissappear after 5 seconds
const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        show(state,action) {
            return action.payload;
        },
        reset() {
            return "";
        },
    }
})

export const {show,reset} = notificationSlice.actions;

export const setNotification = (message) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(reset());
        },2000)
        dispatch(show(message));
    }
}

export default notificationSlice.reducer;