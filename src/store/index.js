import { configureStore } from "@reduxjs/toolkit";
import dataFilm from "./dataFilmSlice";

const store = configureStore({
    reducer: {
        datafilm: dataFilm
    }
})

export default store;