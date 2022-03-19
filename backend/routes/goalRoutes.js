const express = require('express')
const { getGoals, deleteGoal, updateGoal, setGoal } = require('../controllers/goalController')

const router = express.Router()

// protect goals 
const {protect} = require('../middleware/authMiddleware')

// GET request 
router.get('/' , protect ,
    getGoals
)

// POST request
router.post('/' , protect ,
        setGoal

)

// PUT request
router.put('/:id' , protect ,
        updateGoal
    
)

// DELETE request
router.delete('/:id' , protect ,
        deleteGoal
    
)


module.exports = router