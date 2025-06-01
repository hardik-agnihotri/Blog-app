import express from "express";
import {validate} from "../middleware/validate.js";
import {loginSchema, resgiterSchema} from "../validators/userValidator.js";
import {loginUser, registerUser} from "../controllers/userControllers.js"
const router = express.Router();

router.post("/register",validate(resgiterSchema),registerUser);
router.post("/login",validate(loginSchema),loginUser);


export default router;