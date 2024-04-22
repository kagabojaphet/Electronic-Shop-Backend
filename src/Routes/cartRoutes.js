import express from "express";
import CartController from "../Controller/cartsController";

const router=express.Router()

router.post("/:id",CartController.addToCart)
router.get("/",CartController.getAll)

export default router