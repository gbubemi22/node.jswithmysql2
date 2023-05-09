import User from '../models/User.js';
import CustomError from '../errors/conflict.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';

const validatePasswordString = (password) => {
     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

     if (!password.match(regex)) {
          throw new CustomError.BadRequestError(
               'Password must contain a capital letter, number, special character & greater than 8 digits.',
          );
     }
}


const authController = {
     registration: async (req, res) => {
          const { first_name, last_name, email, number, password } = req.body;




          validatePasswordString(password);

          const emailAlreadyExites = await User.findOne({ where: { email: email } })

          if (emailAlreadyExites) {
               throw new CustomError.ConflictError('Email already registered')
          }


          const existingNumber = await User.findOne({ where: { number } });
          if (existingNumber) {
               throw new CustomError.ConflictError('Number already registered');
          }

          if (!req.body) {
               throw new CustomError.BadRequestError('Request body is empty');

          }


          // Hash the password and create the user
          const hashedPassword = await hashPassword(password);


          const user = await User.create({
               first_name,
               last_name,
               email,
               number,
               password: hashedPassword
          })

          res.status(StatusCodes.CREATED).json({
               user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    number: user.number,

               }
          })
     },


     login: async (req, res) => {
          const { email, password } = req.body;

          const user = await User.findOne({ where: { email } });
          if (!user) {
               throw new CustomError.BadRequestError('Invalid email or password');
          }

          // Check the password
          const isPasswordValid = await comparePassword(password, user.password);
          if (!isPasswordValid) {
               throw new CustomError.BadRequestError('Invalid email or password');
          }

          // Generate a JWT token
          const token = jwt.sign(
               { userId: user.id, email: user.email },
               process.env.JWT_SECRET,
               { expiresIn: '1h' }
          );

          res.status(StatusCodes.OK).json({
               user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    number: user.number,
               },
               token
          });
     }

}


export default authController;