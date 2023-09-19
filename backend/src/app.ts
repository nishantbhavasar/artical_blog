import dotenv from 'dotenv';
dotenv.config({path:`${process.env.NOTDE_ENV}.env`});
import express,{Application,Request,Response} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDb } from './models';
import router from './router';

const app:Application = express();

// Checking the Environment File
if(!process.env.NODE_ENV) throw new Error(`Please Provides the Environment ##########`)
dotenv.config({path:`${process.env.NODE_ENV}.env`});

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(cors());
app.use('/api',router);

//db connection
connectToDb()

// Listening Server
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    // console.clear(); // uncomment if you want clear console whenever server restart
    console.log(`Server Running On Port ${PORT} or Environment ${process.env.NODE_ENV}`);
});