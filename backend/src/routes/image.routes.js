import express from 'express'
import multer from 'multer';
import { protectRoute } from '../midlewear/auth.midlewear.js';
import { removeDP, uploadDP } from '../controller/upload.controller.js';

const router = express.Router(); 

const upload = multer({dest: 'uploads/'});


router.post('/dp',protectRoute,upload.single('file'),uploadDP)
router.post('/remove-dp',protectRoute,removeDP);

export default router