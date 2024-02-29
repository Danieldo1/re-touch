import mongoose, {Mongoose} from "mongoose";

interface MongooseConnection{
    conn: Mongoose | null
    promise: Promise<Mongoose> | null 
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached){
    cached = (global as any).mongoose = {conn: null, promise: null}
}

const DB=process.env.MONGODB_URI

export const connectToDB = async () => {
    if(cached.conn){
        return cached.conn
    }
    if(!DB){
        throw new Error("MONGODB_URI is not defined")
    }
    cached.promise = cached.promise || mongoose.connect(DB,{
        dbName: 're-touch', bufferCommands: false
    })

    cached.conn = await cached.promise
    return cached.conn
}