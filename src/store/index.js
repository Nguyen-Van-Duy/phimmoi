import { configureStore } from "@reduxjs/toolkit";
import dataFilm from "./dataFilmSlice";
import LoginSlice from "./LoginSlice";
import profileCast from "./profileCastSlice";

const store = configureStore({
    reducer: {
        datafilm: dataFilm,
        profileCast: profileCast,
        loginSlice: LoginSlice
    }
})

export default store;