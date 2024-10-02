import mongoose from "mongoose";


export const dbconnect = async() => {

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
        return db;
    } catch (error) {
        console.log("error connecting mongodb", error);
        process.exit(1)
    }
}