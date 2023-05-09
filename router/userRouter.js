import express from 'express';
const router = express.Router();


import userController from '../controllers/userControllers.js';



router
.route('/')
.get(userController.allUsers);




export default router;