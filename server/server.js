import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();

const app = express();
//db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(() => {
    console.log("DATABASE CONNECTED");
}).catch(error => console.log(error));
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());
//router
app.get('/api', (req, res) => {
    
});