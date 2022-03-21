// passing route excepion to error handler middleware
const asycnHandler = require('express-async-handler')

// get Goal Schema
const Goal = require('../models/goalModel')
//get User schema
const User = require('../models/userModel')

// @desc Get Goals
// @roue GET /api/goals
// access PRIVATE
const getGoals =asycnHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc Set Goal
// @roue POST /api/goals
// access PRIVATE
const setGoal =asycnHandler( async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add some text!")
    }

    const goal = await Goal.create(
        {
            text:req.body.text,
            user:req.user.id
        }
    )
    res.status(200).json(goal)
})


// @desc Update Goal by id
// @roue PUT /api/goals/:id
// access PRIVATE
const updateGoal =asycnHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    if(!req.user){
    res.status(400)
    throw new Error("User not found")
    }

    // make sure its the same user 
    if(goal.user.toString() !== req.user.id){
        res.status(400)
        throw new Error("User not authorized")
    }


    // (id , new updates , create new one if not found)
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatedGoal)
})


// @desc Delete Goal
// @roue DELETE /api/goals/:id
// access PRIVATE
const deleteGoal = asycnHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    if(!req.user){
        res.status(400)
        throw new Error("User not found")
    }

    // make sure its the same user 
    if(goal.user.toString() !== req.user.id){
        res.status(400)
        throw new Error("User not authorized")
    }

    // (id , new updates)
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id, req.body)

    res.status(200).json(deletedGoal)
})




module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}