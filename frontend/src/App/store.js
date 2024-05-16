import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userFeature/userSlice"
export const store = configureStore({
    reducer: {
        user: userReducer
    }
})