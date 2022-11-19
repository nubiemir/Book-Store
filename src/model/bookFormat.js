const mongoose = require("mongoose")
const {Schema} = mongoose


const formatSchema = new Schema({
    format: Schema.Types.String
})

const bookFormat = mongoose.model("BookFormat",formatSchema)
module.exports = bookFormat




