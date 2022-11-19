exports.getWishList = async (req, res) => {
  const wishListFetch = (await req.user.populate("wishList.products")).wishList
    .products;
  res.render("wishList", {
    wishList: wishListFetch,
  });
};

exports.postWishList = async (req, res) => {
  const { pid } = req.body;
  await req.user.addToWishList(pid);
  res.redirect(303, "/fab");
};

exports.removeWishList = async (req, res) => {
  const { pid } = req.body;
  await req.user.removeItem(pid);
  res.redirect(303, "/fab/wish-list");
};
