import express from "express"
import config from "./config/config.js"
import dbConnect from "./database/database.js"
import router from "./router/router.js"
import errorHandler from "./middlewares/errorHandler.js"
import cookieParser from  'cookie-parser'
import cors from "cors"


// const corsOption = {
//     credentials: true ,   // for cookies
//     origin: ['http://localhost:3000']
// }

const app = express()
app.use(cookieParser())

// app.use(cors(corsOptions));
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json( { limit: "50mb" } ))

app.use('/storage', express.static('storage'))

app.use("/" , router)

dbConnect()

app.use(errorHandler)

app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`))
app.get('/', (req, res) => res.send(`Welcome Mubben `) )