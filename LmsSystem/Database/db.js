import mongoose from "mongoose";

const MAX_RETRIES = 3 
const RETRY_INTERVAL = 5000

//  you create a class
class DatabaseConnection{
constructor(){
    this.retryCount = 0
    this.isConnected = false ;
   
    //  configure mongoose
    mongoose.set('strictQuery' ,true)

    // event 
    mongoose.connection.on("connected",()=>{
        console.log('mongodb connected successfully');
        this.isConnected =true 
    })

    mongoose.connection.on("error",()=>{
        console.log('mongodb connection error');
        this.isConnected = false ;
    })

    mongoose.connection.on("disconnected",()=>{
        console.log('mongodb Disconnected');
        this.isConnected = false ;

    })
}

async connect() {
    if(!process.env.MONGO_URL)
        throw new Error("MongoDb URI is not defined")


    const connectionOptions = {
     useNewUrlParser : true,
     userUnifiedTopology : true,
     maxPoolSize : 10 ,
     serverSelectionTimeOutMS : 5000,
    socketTimeoutMS : 45000 ,
    family : 4
    }
    if(process.env.NODE_ENV = " development")
        mongoose.set('debug',true)
    }
}

//  strictQuery 