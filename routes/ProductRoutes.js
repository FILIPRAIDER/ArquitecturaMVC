import express from "express";
import ProductController from "../controladores/ProductController.js";

const router = express.Router();

router.get("/", ProductController.listProducts);
router.post("/", ProductController.addProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
