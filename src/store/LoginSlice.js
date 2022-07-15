import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  conversationId: '',
  dataUser: null,
  urlConnect: process.env.REACT_APP_CONNECT_SERVER,
  online: null
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.dataUser = action.payload
      state.isLogin = true
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload
    },
    logout: (state, action) => {
      state.conversationId = ""
      state.isLogin = false
      state.dataUser = null
    },
    setOnline: (state, action) => {
      state.online = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setUserId, setConversationId, logout, setOnline } = loginSlice.actions

export default loginSlice.reducer;