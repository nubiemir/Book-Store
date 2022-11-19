const router = require("express").Router()
const {postProduct} = require("../controller/addProductController")



router.post("/add-product", postProduct)



module.exports = router;