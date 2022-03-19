const express = require('express')
const { getGoals, deleteGoal, updateGoal, setGoal } = require('../controllers/goalController')

const router = express.Router()

// GET request 
router.get('/' ,
    getGoals
)

// POST request
router.post('/' ,
        setGoal

)

// PUT request
router.put('/:id' ,
        updateGoal
    
)

// DELETE request
router.delete('/:id' ,
        deleteGoal
    
)


module.exports = router