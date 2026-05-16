import dotenv from "dotenv"
dotenv.config()

export default{
    PORT : process.env.PORT,
    CONNECTION_STRING : process.env.CONNECTION_STRING,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    BACKEND_SERVER_PATH: process.env.BACKEND_SERVER_PATH

}