import express from "express";
import productRoutes from "./productRoutes";
import cartRoutes from "./cartRoutes";
import userRoutes from "./userRoutes";

const router=express.Router()

router.use("/product",productRoutes)
router.use("/cart",cartRoutes)
router.use("/user",userRoutes)

export default router