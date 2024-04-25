import express from "express";
import CartController from "../Controller/cartsController";
import verifyAccess from "../MiddleWares/verifyAccess";

const router=express.Router()

router.post("/:id",verifyAccess("user"),CartController.addToCart)
router.get("/",CartController.getAll)
router.delete("/",CartController.deleteAll)
router.get("/:id",CartController.getOne)

export default router