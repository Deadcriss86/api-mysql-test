import { Router } from "express";
import {getData,getDatas,CreateData, updateData, DeleteData} from '../controllers/data.controller.js'
const router = Router()

router.get('/data', getDatas) 

router.get('/data/:id', getData) 

router.post('/data', CreateData) 

router.put('/data', updateData) 

router.delete('/data', DeleteData) 

export default router