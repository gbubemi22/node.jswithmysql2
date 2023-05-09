import User from '../models/User.js';
import CustomError from '../errors/conflict.js';
import { StatusCodes } from 'http-status-codes';





const userController = {

     allUsers: async (req, res, next) => {
          const user = await User.findAll({ attributes: { exclude: ['password'] } })

          res.status(StatusCodes.OK).json({
               message: true,
               user: user
          })
     }
}



export default userController; 