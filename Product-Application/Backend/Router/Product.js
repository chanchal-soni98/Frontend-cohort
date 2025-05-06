const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../Controllers/Product.js');

const router = express.Router();

router.post('/task', createProduct);
router.get('/getTasks', getAllProducts);
router.get('/getTask/:id', getProductById);
router.put('/updateTask/:id', updateProduct);
router.delete('/deleteTask/:id', deleteProduct);

module.exports = router;