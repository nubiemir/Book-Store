const Product = require("../model/products")

exports.postProduct = async(req,res)=>{
    try{

        const {title,ISPN,price,description,bookFormat,categories,author, bookIntro} = req.body;
        const productDetails = {
            ISPN:ISPN,
            Categories: categories.split(","),
            BookAuthor: author,
            bookFormat: bookFormat.split(","),
            bookIntro: bookIntro
        }
        const product = new Product({
            title,price,description,productDetails}
            )
        await product.save()
        res.redirect(303,"/fab")
    }catch(err){
        console.log(err.message)
    }

}