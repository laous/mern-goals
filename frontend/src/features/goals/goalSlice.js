import {createAsyncThunk , createSlice} from "@reduxjs/toolkit"
import goalService from "./goalService"

const initialState = {
    goals: [],
    isError : false,
    isSucess: false,
    isLoading: false,
    message:''
}
export const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset : state => initialState
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer