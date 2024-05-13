import mongoose from "mongoose";

export const mongoConnection = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "Authentication" })
        .then(() => console.log(`Database connected`))
        .catch((e) => console.log(`Error while database connection : ${e}`))
}
