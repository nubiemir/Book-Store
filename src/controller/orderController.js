const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const Order = require("../model/order")
exports.postOrders = async(req,res)=>{
    try{

        const products =( await req.user.populate("cart.products.product")).cart.products
        const orderList = products.map(product=>{
            return {
                ...product.product._doc,
                qty: product.qty
            }
        })
        const order = new Order({
            orderList,
            total: req.query.tt,
            user: req.user._id,
        }
        );

        await order.save()
        
        req.user.cart.products = []
        await req.user.save()

        res.redirect(303, "/fab/cart")

    }catch(err){
        console.log(err.message)
    }


}
exports.clearOrders = (req,res)=>{

}

exports.checkoutOrder = async (req,res) =>{
    try{

        const products =( await req.user.populate("cart.products.product")).cart.products
        
        const session = await stripe.checkout.sessions.create({
            line_items: products.map(product=>{
                return{
                    price_data:{
                        currency: "AED",
                        product_data: {
                            name: product.product.title
                        },
                        unit_amount: (product.product.price) * 100
                    },
                    quantity: product.qty,
                }
                
            }),
            mode: 'payment',
            success_url: `http://localhost:3000/fab/payment-success?tt=${req.body.totalCost}`,
            cancel_url: `http://localhost:3000/fab/payment-failed`,
        });
        res.redirect(303, session.url);
    }catch(err){
        console.log(err.message)
    }

}


exports.failure = (req,res)=>{
    res.render("failure")
}