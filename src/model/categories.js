const mongoose = require("mongoose")
const {Schema} = mongoose


const categorySchema = new Schema({
    cat: Schema.Types.String
})



const category = mongoose.model("categories",categorySchema)
module.exports = category
