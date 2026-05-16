import express from "express"
import config from "./config/config.js"
import dbConnect from "./database/database.js"
import router from "./router/router.js"
import errorHandler from "./middlewares/errorHandler.js"
import cookieParser from  'cookie-parser'


const expr = express()

expr.use(cookieParser())
expr.use(express.json())
expr.use('/storage', express.static('storage'))

expr.use("/" , router)

dbConnect()
expr.use(errorHandler)


expr.listen(config.PORT, () => console.log(`Server is running on http:/localhost:${config.PORT}`))
expr.get('/', (req, res) => res.send(`Welcome Mubben `) )