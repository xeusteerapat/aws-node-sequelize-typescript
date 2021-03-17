import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/sequelize';
import { User } from './models/User';
import userRoutes from './routes/user';
import imageRoute from './routes/image';

dotenv.config();

(async function () {
  await sequelize.addModels([User]);
  await sequelize.sync();

  const app = express();

  app.use(express.json());

  app.use('/api', userRoutes);
  app.use('/api', imageRoute);

  const { PORT } = process.env;

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
})();
