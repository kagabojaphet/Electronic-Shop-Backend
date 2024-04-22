import express from "express";
import UserController from "../Controller/userController";

const router=express.Router()

router.post("/",UserController.postUser)
router.get("/",UserController.getAll)
router.post("/login",UserController.login)

export default router