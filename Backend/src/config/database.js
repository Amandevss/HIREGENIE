const mongoose = require("mongoose")


async function connecttoDB() {

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database")
    } catch (error) {
        console.error("Error connecting to database:", error)
    }
}

module.exports = connecttoDB