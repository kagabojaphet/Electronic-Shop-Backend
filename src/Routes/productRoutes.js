import express from "express";
import ProductController from "../Controller/productController";


const router=express.Router()

router.post("/",ProductController.postProduct)
router.get("/",ProductController.getProduct)
router.delete("/",ProductController.delleteAllProduct)
router.get("/:id",ProductController.getOneProduct)
router.delete("/:id",ProductController.DeleteOneProduct)
router.patch("/:id",ProductController.update)

export default router