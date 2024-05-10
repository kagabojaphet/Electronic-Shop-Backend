import express from "express";
import UserController from "../Controller/userController";
import DataChecker from "../MiddleWares/dataChecker";
import Validator from "../MiddleWares/validator";

const router=express.Router()

router.post("/",DataChecker.userRegistrationEmpty,DataChecker.emailExisting,Validator.UserAccountRule(),Validator.InputValidator
               ,UserController.postUser)
router.patch("/:id",UserController.update)               
router.get("/",UserController.getAll)
router.delete("/:id",UserController.deleteOne)
router.delete("/",UserController.deleteAll)
router.post("/login",UserController.login)

export default router