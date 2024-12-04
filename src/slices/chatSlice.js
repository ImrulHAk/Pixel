import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}

export const chatSlice = createSlice({
    name: 'chating',
    initialState,
    reducers: {
        chatingInfo: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { chatingInfo } = chatSlice.actions

export default chatSlice.reducer