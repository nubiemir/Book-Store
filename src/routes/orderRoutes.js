const { getOrders } = require("../controller/homeController")
const { postOrders, clearOrders, checkoutOrder } = require("../controller/orderController")
const { failure } = require('../controller/orderController')

const router = require("express").Router()


router.get("/payment-success", postOrders)
router.post('/create-checkout-session',checkoutOrder)
router.post("/clear-orders", clearOrders)
router.get("/payment-failed", failure)




module.exports = router
