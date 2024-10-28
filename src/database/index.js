import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async () => {
    try {
        const connectionURL = process.env.MONGODB_CONNECTION_URL;
        await mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Blog database connection is successful");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

export default connectToDB;