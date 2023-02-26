import express from 'express'
const router = express.Router()
import {authUser} from  '../controllers/loginController.js'

router.post('/',authUser)

export default router