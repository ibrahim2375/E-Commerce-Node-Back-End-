const router = require('express').Router();
//admin
router.use('/admin/create', require('./admin/register')); //create user
router.use('/admin/login', require('./admin/login')); // user login
//users
router.use('/user/create', require('./user/auth/register')); //create user
router.use('/user/login', require('./user/auth/login')); // user login
router.use('/users/get', require('./user/getUsers')); // get all users
router.use('/user/get', require('./user/auth/getUser')); // get user by id
router.use('/user/update', require('./user/auth/update')); // update user by id

router.use('/generateOTP', require('./user/auth/generateOTP')); // generate OTP to verify user;
router.use('/verifyOTP', require('./user/auth/verifyOTP')); // verify OTP
router.use('/createResetSession', require('./user/auth/createResetSession')); // verify OTP
router.use('/resetPassword', require('./user/auth/resetPassword')); // reset password

//orders
router.use('/orders/get', require('./orders/getOrders')); // get  orders in cart
router.use('/order/add', require('./orders/addOrder')); // add  order to cart
router.use('/order/delete', require('./orders/deleteOrder')); // delete  order to cart

//categories
router.use('/categories/get', require('./categories/getCategories')); // get  categories
router.use('/category/add', require('./categories/addCategory')); // add  category

//offers
router.use('/offers/get', require('./offers/getOffers')); // get  offers
router.use('/offer/add', require('./offers/addOffer')); // add  offer

//brands
router.use('/brands/get', require('./brands/getBrands')); // get  brands
router.use('/brand/add', require('./brands/addBrand')); // add  brand

//products
router.use('/products/get', require('./products/getProducts')); // get all products
router.use('/product/get', require('./products/getProduct')); // get  product
router.use('/product/create', require('./products/createProduct')); // create  product
router.use('/product/delete', require('./products/deleteProduct')); // delete  product
router.use('/product/update', require('./products/updateProduct')); // update  product
router.use('/product/view', require('./products/viewProduct')); // view product
router.use('/products/latest', require('./products/getLatestProducts')); // latest  products
router.use('/products/sample', require('./products/getSample')); // sample  products
router.use('/products/by-category', require('./products/getByCategory')); // get by category  products
router.use('/products/most-views', require('./products/getMostViewed')); // most viewed products
router.use('/products/search', require('./products/search')); // search


module.exports = router;
