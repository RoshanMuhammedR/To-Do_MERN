import express from "express";
import { checkAuth, signup,login} from "../controller/auth.controller.js";
import { protectRoute } from "../midlewear/auth.midlewear.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);

router.get('/check',protectRoute,checkAuth)




export default router