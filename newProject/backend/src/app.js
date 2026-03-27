import express, { urlencoded } from 'express'
import cors from 'cors'
import env from "./config/env.config.js"
import cookieParser from 'cookie-parser'

import userRouter from "./routes/User.routes.js"
import courseRouter from "./routes/Course.routes.js"
import profileRouter from './routes/Profile.routes.js'
import sectionRouter from './routes/Section.routes.js'
import subSectionRouter from './routes/SubSection.routes.js'
import paymentRouter from './routes/Payment.routes.js'
import categoryRouter from './routes/Category.routes.js'
import ratingAndReviewsRouter from "./routes/RatingAndReviews.routes.js"
import contactUsController from './controllers/ContactUs.controllers.js'


import helmet from 'helmet'
import errorMiddleware from "./middlewares/error.middleware.js"
import contactUsRouter from './routes/ContactUs.routes.js'

const app = express()
app.use(express.static("public")) // in case u want to files data in server.
app.use(express.json())
app.use(urlencoded({
    extended: true
}))

app.use(cors({
    origin: env.ORIGIN,
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.static("public"))

// to access cookie and token which will stored in here.
// you can now access them into the req and res 
app.use(cookieParser())
app.use(helmet())



app.use("/api/v1/users", userRouter) //done
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/profile",profileRouter) //done
app.use("/api/v1/section",sectionRouter)
app.use("/api/v1/subSection",subSectionRouter)
app.use("/api/v1/ratingAndReviews",ratingAndReviewsRouter)

//  payment  route section need to be completed
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/contactUs",contactUsRouter) //done

app.use(errorMiddleware)
export default app 