import {createSlice} from '@reduxjs/toolkit'

export const userDetailsSlice =  createSlice({
    name:"userDetails",
    initialState:{
        value:null
    },
    reducers:{
        set_user_details:(state , action)=>{
            state.value = action.payload.user_details
        }
    }
})

export const {set_user_details} = userDetailsSlice.actions
export default userDetailsSlice.reducer