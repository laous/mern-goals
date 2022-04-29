import {createAsyncThunk , createSlice} from "@reduxjs/toolkit"
import goalService from "./goalService"

const initialState = {
    goals: [],
    isError : false,
    isSucess: false,
    isLoading: false,
    message:''
}


export const createGoal = createAsyncThunk('goals/create',
    async (goal, thunkAPI) => {
            try{
                const token = thunkAPI.getState().auth.user.token
                return await goalService.createGoal(goal,token)
            }catch (error) {
                const message =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString()
                return thunkAPI.rejectWithValue(message)
              }
    }
)

export const getAllGoals = createAsyncThunk('goals/getAllGoals', 
    async (_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
                return await goalService.getAllGoals(token)
        }catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
          }
    }
)

export const deleteGoal = createAsyncThunk(
    'goals/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


export const goalSlice = createSlice({
    name:'goals',
    initialState,
    reducers:{
        reset : state => initialState
    },

    extraReducers:builder => {
        builder
        // create goal
            .addCase(createGoal.pending , state => {state.isLoading = true})
            .addCase(createGoal.fulfilled, (state,action)=>{
                state.isLoading= false
                state.isSucess=true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state,action)=>{
                state.isLoading= false
                state.isError=true
                state.message=action.payload
            })
            // get all goals
            .addCase(getAllGoals.pending , state => {state.isLoading = true})
            .addCase(getAllGoals.fulfilled, (state,action)=>{
                state.isLoading= false
                state.isSucess=true
                state.goals =action.payload
            })
            .addCase(getAllGoals.rejected, (state,action)=>{
                state.isLoading= false
                state.isError=true
                state.message=action.payload
            })
            // delete goal
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
              })
              .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucess = true
                state.goals = state.goals.filter(
                    (goal) => goal._id !== action.payload.id
                  )
              })
              .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
              })
    }
})


export const {reset} = goalSlice.actions
export default goalSlice.reducer