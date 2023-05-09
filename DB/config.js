import * as dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('myjob', 'admin1', 'testpassword', {
     host: 'localhost',
     dialect: 'mysql',
     port: 3306,
     pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000
     }
});


// sync the database tables
sequelize.sync().then(() => {
     console.log('Database tables synced');
   }).catch((error) => {
     console.error('Unable to sync database tables:', error);
   });

//Test the connection

(async () => {
     try {
          await sequelize.authenticate();
          console.log('Connection has been established ope ooo');
     } catch (error) {
          console.log('Unable to connect to the database:', error);
     }
})();


export default sequelize;
