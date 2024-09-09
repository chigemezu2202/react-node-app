//Info: Package Imports::.::.::.::................!!!

//TODO: Node server framwork
import express from 'express';

//TODO: import dotenv to use .env file
import dotenv from 'dotenv';

// //TODO: import cors
import cors from 'cors'

//Info: Local Imports::.::.::.::..................!!!
//TODO: import MongoDb database connection
import { connectDB } from './db/connectDB.js'

//TODO: import authroute from router
import authRouter from './routes/auth.route.js'

// //TODO: import cookie parser
import cookieParser from 'cookie-parser';


//TODO: Built in node module
import path from "path";


dotenv.config(); //Hack: to enable process of .env variables

const app = express()
const PORT = process.env.PORT || 5000;

//TODO: Get a variable
const __dirname = path.resolve();

//TODO: Enable CORS middleware
app.use(cors({ origin:  process.env.CLIENT_URL, credentials: true}))

//TODO: Middleware to parse JSON request bodies  **
//Hack: allows us to parse incomming & ougoing request: req.body in json format
app.use(express.json()) //Hack: parse json request bodies

//TODO: Middleware to verify token
//Hack: allow us to parse incoming cookies
app.use(cookieParser());

//TODO: Create Authentication Route  
app.use("/api/auth", authRouter)


//TODO: Make frontend folder to be static asset
if(process.env.NODE_ENV === "production") {
    //Hack: "__dirname" is the root folder of the project
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    //Hack: Get all other route other than defined existing route
    app.get("*", (req, res) => {
        //Hack: from here send a file to client || react app itself
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(5000, () => {
    connectDB(); //Hack: To Run Database Connection Function
    console.log("Server is running on port", PORT)
})