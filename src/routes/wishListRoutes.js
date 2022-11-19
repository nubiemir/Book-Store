const { getWishList, postWishList, removeWishList } = require('../controller/wishListController')

const router = require('express').Router()

router.get("/wish-list", getWishList)
router.post("/wish-list", postWishList)
router.post("/remove-wish-list",removeWishList)




module.exports = router