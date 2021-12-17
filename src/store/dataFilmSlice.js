import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    dataMovie: {
        movie_now_play: [],
        movie_trending: [],
        movie_upcoming: [],
        movie_popular: [],
        movie_top_rated: [],
    },
    dataTv: {
        tv_trending: [],
        tv_popular: [],
        tv_top_rated: [],
        tv_on_the_air: [],
    },
    dataSearch: []
}

const dataFilmSlice = createSlice({
    name: 'DATA_FILM',
    initialState: initialState,
    reducers: {
        movie_now_play(state, action) {
            state.dataMovie.movie_now_play = action.payload;
        },

        movie_trending(state, action) {
            state.dataMovie.movie_trending = action.payload;
        },

        movie_upcoming(state, action) {
            state.dataMovie.movie_upcoming = action.payload;
        },

        movie_popular(state, action) {
            state.dataMovie.movie_popular = action.payload;
        },

        movie_top_rated(state, action) {
            state.dataMovie.movie_top_rated = action.payload;
        },

        //tv
        tv_trending(state, action) {
            state.dataTv.tv_trending = action.payload;
        },

        tv_popular(state, action) {
            state.dataTv.tv_popular = action.payload;
        },

        tv_top_rated(state, action) {
            state.dataTv.tv_top_rated = action.payload;
        },

        tv_on_the_air(state, action) {
            state.dataTv.tv_on_the_air = action.payload;
        },
    }
})

const {actions} = dataFilmSlice;

export const dataFilmAction = actions;

export default dataFilmSlice.reducer;