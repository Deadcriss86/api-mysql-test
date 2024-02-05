import { Router } from "express";
import {getData,CreateData, updateData, DeleteData} from '../controllers/data.controller.js'
const router = Router()

router.get('/data', getData) 

router.post('/data', CreateData) 

router.put('/data', updateData) 

router.delete('/data', DeleteData) 

export default router