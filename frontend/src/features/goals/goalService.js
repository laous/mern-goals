import axios from "axios"

const API_URL = '/api/goals'


// create a goal
const createGoal = async (goal,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    
      const response = await axios.post(API_URL, goal, config)
    
      return response.data
}

// get all goals
const getAllGoals = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    
      const response = await axios.get(API_URL, config)
    
      return response.data
}

const goalService = {
    createGoal,
    getAllGoals
}

export default goalService