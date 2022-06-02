import { createSlice } from '@reduxjs/toolkit'

export const mentorIdSlice = createSlice({
    name: 'mentorId',
    initialState: {
        value: null
    },
    reducers: {
        setMentorId: (state, action) => {
            state.value = action.payload.mentorId
        }
    }
})

export const { setMentorId } = mentorIdSlice.actions
export default mentorIdSlice.reducer