
const asycnHandler = require('express-async-handler')

// @desc Get Goals
// @roue GET /api/goals
// access PRIVATE
const getGoals =asycnHandler(async (req, res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('Please add some text')
    }
    console.log(req.body.text)
    res.status(200).json({message: "get goals"})

})

// @desc Set Goal
// @roue POST /api/goals
// access PRIVATE
const setGoal =asycnHandler( async (req, res) => {
    res.status(200).json({message: "create goal"})
})


// @desc Update Goal by id
// @roue PUT /api/goals/:id
// access PRIVATE
const updateGoal =asycnHandler(async (req, res) => {
    res.status(200).json({message: `update goal ${req.params.id}`})
})


// @desc Delete Goal
// @roue DELETE /api/goals/:id
// access PRIVATE
const deleteGoal = asycnHandler(async(req, res) => {
    res.status(200).json({message: `delete goal ${req.params.id}`})
})




module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}