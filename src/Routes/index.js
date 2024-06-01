import express from "express";
import productRoutes from "./productRoutes";
import cartRoutes from "./cartRoutes";
import userRoutes from "./userRoutes";
import payment from "./payment"

const router=express.Router()

router.use("/product",productRoutes)
router.use("/cart",cartRoutes)
router.use("/user",userRoutes)
router.use("/",payment)

export default router