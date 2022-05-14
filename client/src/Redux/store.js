import { configureStore } from '@reduxjs/toolkit'
import aptitudeTypeReducer from './AptitudeType/aptittudeTypeSlice'
import userDetailsReducer from './UserDetails/userDetailsSlice'

export default configureStore({
    reducer: {
        aptitudeType: aptitudeTypeReducer,
        userDetails: userDetailsReducer
    }
})