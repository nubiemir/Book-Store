const mongoose = require("mongoose")
const {Schema} = mongoose

const orderShema = new Schema({
    orderList : {},
    total:{type:Schema.Types.Number},
    user:{
        type: Schema.Types.ObjectId, ref: "User"
    },
    orderStatus:{
        type:Schema.Types.String,
        default:"pending"
    }
    
},
{
    timestamps:{
        createdAt:true,
        updatedAt:false
    }
})






const Order = mongoose.model("Order", orderShema)


module.exports = Order
