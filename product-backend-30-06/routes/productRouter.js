import express from 'express';

const router = express.Router();


router.get('/', getProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
import { createProduct } from '../controllers/productController.js';
import { getProduct, getProductById, updateProduct, deleteProduct } from '../controllers    

export default router;