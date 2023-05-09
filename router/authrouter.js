import express from 'express';
const router = express.Router();

import authController from '../controllers/auth.js';




router
     .route('/signup')
     .post(authController.registration)


router
     .route('/login')
     .post(authController.login)




export default router;