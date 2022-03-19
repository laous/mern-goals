const { registerUser, loginUser , getMe } = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

const router = require('express').Router()

// register new user
router.post(
    '/', registerUser
)

// authenticate user
router.post(
    '/login', loginUser
)

// get me infos
router.get(
    '/me', protect ,getMe
)



module.exports = router