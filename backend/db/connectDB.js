import mongoose from "mongoose"

//Note: DataBase Setup  ***
//Note: Connection to mongoDb  ***
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected succesfully:", conn.connection.host);
    } catch (error) {
        console.log("Connection Error :", error.message);
        process.exit(1)  //Hack: 1 failure, 0 status code is success
    }
}