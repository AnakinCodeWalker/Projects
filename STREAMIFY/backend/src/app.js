const app = express()

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/User.route.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"

// app.use(express.static("public")) // in case u want to files data in server.

app.use(express.json())
app.use(urlencoded({
    extended: true
}))

app.use(cors({
    origin: env.ORIGIN,
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['content-Type', 'Authorization'],
    credentials: true //allow fe to send cookies.
}))

app.use(express.static("public"))

// to access cookie and token which will stored in here.
// you can now access them into the req and res 
app.use(cookieParser())
app.use(helmet())

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user",userRoutes)

app.use(errorMiddleware)
export default app