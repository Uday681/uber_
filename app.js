import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './Routes/UserRoutes.js';

// Initialize environment variables
dotenv.config();

// Initialize express
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', userRoutes);
// app.use('/captains', captainRoutes);
// app.use('/maps', mapsRoutes);
// app.use('/rides', rideRoutes);




export default app;