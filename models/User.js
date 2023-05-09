import { Model, DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';




class User extends Model { }



User.init({
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
     },



     first_name: {
          type: DataTypes.STRING,
          allowNull: false
     },
     last_name: {
          type: DataTypes.STRING,
          allowNull: false
     },
     email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
               isEmail: {
                    args: true,
                    msg: 'Invalid email address'
               }
          }
     },
     number: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     password: {
          type: DataTypes.STRING,
          allowNull: false,
     }

}, {
     sequelize,
     modelName: 'User',
     timestamps: true


})

export default User;