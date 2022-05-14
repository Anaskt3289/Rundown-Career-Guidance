import { createSlice } from '@reduxjs/toolkit'

export const aptitudeTypeSlice = createSlice({
    name: "aptitudeType",
    initialState: {
        value: null
    },
    reducers: {
        changeType: (state, action) => {
            state.value = action.payload.aptitudeType
        }
    }
})

export const { changeType } = aptitudeTypeSlice.actions
export default aptitudeTypeSlice.reducer