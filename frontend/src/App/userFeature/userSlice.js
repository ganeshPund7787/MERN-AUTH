import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: localStorage.getItem("currentUser") ?
        JSON.parse(localStorage.getItem("currentUser")) :
        null,
    loading: false,
    isEditable: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
        },
        signinFail: (state) => {
            state.loading = false;
            state.currentUser = null;
        },
        signinSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        deleteUser: (state) => {
            state.currentUser = null;
            localStorage.clear();
        },
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.clear();
        },
        toggleEdit: (state) => {
            state.isEditable = !state.isEditable;
        }
    }
})

export const { signinStart, signinFail, signinSuccess, deleteUser, logoutUser, toggleEdit } = userSlice.actions;
export default userSlice.reducer;