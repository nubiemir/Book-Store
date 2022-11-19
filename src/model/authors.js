const mongoose = require("mongoose")
const {Schema} = mongoose


const authorSchema = new Schema({
    name: Schema.Types.String
})



const author = mongoose.model("Author",authorSchema)
module.exports = author


