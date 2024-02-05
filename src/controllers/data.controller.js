import {pool} from '../db.js'

export const getData =(req, res)=>res.send('obteniendo datos')

export const CreateData=async(req, res)=>{
    const {name, email, phone, subjet, message}=req.body
   const [rows] = await pool.query('INSERT INTO dataInfo (name, email, phone, subjet, message) VALUES (?, ?, ?, ?, ?)',[name, email, phone, subjet, message])
   res.send({
    id: rows.insertId,
    name,
    email,
    phone,
    subjet,
    message,
   })
}

export const updateData=(req, res)=>res.send('actualizando datos')

export const DeleteData=(req, res)=>res.send('eliminando datos')