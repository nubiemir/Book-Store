const { postCart,deleteCartItem, addItemCart, removeItemCart } = require("../controller/cartController");

const router = require("express").Router()

router.post("/add-to-cart", postCart)
router.post("/delete-cart-item", deleteCartItem)
router.post("/add-item-cart", addItemCart)
router.post("/remove-item-cart", removeItemCart)





module.exports = router;