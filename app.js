import express from 'express';
import 'dotenv/config';
import { dbConnection } from './src/configs/dbConnection.config.js';
import mainRoute from './src/routes/main.route.js';
import {errorHandler} from './src/middlewares/errorHanddler.js' 

const PORT = process.env.PORT || 3001;

const app = express();
dbConnection();

app.use(express.json());
app.use('/api', mainRoute);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})