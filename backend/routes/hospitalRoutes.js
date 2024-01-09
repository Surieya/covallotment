import express from 'express';
import { protect } from '../utils/protect.js'


import { getAllHospital,getSingleHospital,getAllHospitalCities,createHospital,updateHospital ,deleteHospital} from '../controller/hospitalController.js';
const router = express.Router();

router.route('/').get(getAllHospital).post(protect,createHospital)
router.route('/cities').get(getAllHospitalCities);

router.route('/:id').get(protect, getSingleHospital).put(protect,updateHospital).delete(protect,deleteHospital);





export default router;
