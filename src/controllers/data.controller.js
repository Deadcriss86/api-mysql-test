import {pool} from '../db.js'

export const getDatas =async(req, res)=>{
    try {
        const [rows]= await pool.query('SELECT * FROM dataInfo')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}

export const getData =async(req, res)=>{
    try {
        const { id } = req.params;
        const [rows]= await pool.query('SELECT * FROM dataInfo WHERE id=?', [req.params.id])
    
        if(rows.length <=0)return res.status(404).json({
        message: 'Data no found'
    })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}

export const CreateData=async(req, res)=>{
    const {name, email, phone, subjet, message}=req.body
    try {
        const [rows] = await pool.query('INSERT INTO dataInfo (name, email, phone, subjet, message) VALUES (?, ?, ?, ?, ?)',[name, email, phone, subjet, message])
        res.send({
        id: rows.insertId,
        name,
        email,
        phone,
        subjet,
        message,
   })
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}

export const updateData=(req, res)=>{
    try {
        res.send('actualizando datos')
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}

export const DeleteData=(req, res)=>{
    try {
        res.send('eliminando datos')
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}