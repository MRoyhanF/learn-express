import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/Products', verifyUser, getProducts);
router.get('/Product/:id', verifyUser, getProductById);
router.post('/Product/', verifyUser, createProduct);
router.patch('/Product/:id', verifyUser, updateProduct);
router.delete('/Product/:id', verifyUser, deleteProduct);

export default router;