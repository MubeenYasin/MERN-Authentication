import mongoose from "mongoose"
import config from "../config/config.js"

const dbConnect = async () => {
    try{
        const startDB = await mongoose.connect(config.CONNECTION_STRING)
        console.log(`MongoDB is connected with ${startDB.connection.host}`)

    }catch(error){console.log({error})}
}
export default dbConnect