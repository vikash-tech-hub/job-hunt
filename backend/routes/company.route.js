import express from 'express';

const router = express.Router();
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompanyById } from '../controllers/company.controller.js';
router.route('/register').post(isAuthenticated,registerCompany);
router.route('/get').get(isAuthenticated,getCompany); 
router.route("/get/:id").get(isAuthenticated,getCompanyById)
router.route("/update/:id").put(isAuthenticated,updateCompanyById);

export default router;
