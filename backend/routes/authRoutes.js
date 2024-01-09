import express from 'express';
import {createUser,loginAdmin,loginUser} from '../controller/authController.js'

const router = express.Router();


router.route('/register').post(createUser);
router.route('/login').post(loginUser)
router.route('/login/admin').post(loginAdmin);





export default router;
