const router = require("express").Router();
const {
  getHome,
  getCart,
  getOrders,
  getAddProducts,
  getProduct,
} = require("../controller/homeController");

router.get("/", getHome);
router.get("/cart", getCart);
router.get("/orders", getOrders);
router.get("/add-product", getAddProducts);
router.get("/product/:p_id", getProduct);

module.exports = router;
