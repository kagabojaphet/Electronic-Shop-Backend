import express from "express";
import ProductController from "../Controller/productController";
import uploaded from "../MiddleWares/uploadImage";
import verifyAccess from "../MiddleWares/verifyAccess";


const router=express.Router()

router.post("/",uploaded,ProductController.postProduct);
router.get("/",ProductController.getProduct)
router.delete("/",ProductController.delleteAllProduct)
router.get("/:id",ProductController.getOneProduct)
router.delete("/:id",ProductController.DeleteOneProduct)
router.patch("/:id",ProductController.update)

export default router