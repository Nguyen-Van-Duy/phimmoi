import { createSlice } from "@reduxjs/toolkit"

const initialCastState = {
    isShowProfile: false,
    castId: ''
}

const profileSlice = createSlice({
    name: 'PROFILE',
    initialState: initialCastState,
    reducers: {
        handleShowProfile(state, action) {
            state.isShowProfile = action.payload
        },
        handleCastId(state, action) {
            state.castId = action.payload
        }
    }
})

const {actions} = profileSlice;

export const handleShowProfileCast = actions;

export default profileSlice.reducer;