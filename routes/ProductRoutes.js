import express from "express";
import ProductController from "../controlador/ProductController.js";

const router = express.Router();

router.post("/products", ProductController.addProduct);
router.get("/products", ProductController.listProducts);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;