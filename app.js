import express from 'express';
import 'dotenv/config';
import { dbConnection } from './src/configs/dbConnection.config.js';
import mainRoute from './src/routes/main.route.js';
import { errorHandler } from './src/middlewares/errorHanddler.js'
import cron from 'node-cron'
import { releaseExpiredSpaces } from './src/services/space.service.js';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();
dbConnection();

cron.schedule('0 0 * * *', async () => {
  await releaseExpiredSpaces(); 
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/api', mainRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
