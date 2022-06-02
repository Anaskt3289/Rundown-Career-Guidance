import { configureStore } from '@reduxjs/toolkit'
import aptitudeTypeReducer from './AptitudeType/aptittudeTypeSlice'
import userDetailsReducer from './UserDetails/userDetailsSlice'
import mentorIdReducer from './MentorId/mentorIdSlice'

export default configureStore({
    reducer: {
        aptitudeType: aptitudeTypeReducer,
        userDetails: userDetailsReducer,
        mentorId: mentorIdReducer
    }
})