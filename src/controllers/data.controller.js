import {pool} from '../db.js'

export const getDatas =async(req, res)=>{
    try {
        const [rows]= await pool.query('SELECT * FROM ContactUsForm')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}

export const getData =async(req, res)=>{
    try {
        const { id } = req.params;
        const [rows]= await pool.query('SELECT * FROM ContactUsForm WHERE id=?', [req.params.id])
    
        if(rows.length <=0)return res.status(404).json({
        message: 'Data no found'
    })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}

export const CreateData=async(req, res)=>{
    const {Name, Email, Subject, PhoneNumber, Message}=req.body
    try {
        const [rows] = await pool.query('INSERT INTO ContactUsForm (Name, Email, Subject, PhoneNumber, Message) VALUES (?, ?, ?, ?, ?)',[Name, Email, Subject, PhoneNumber, Message])
        res.send({
        id: rows.insertId,
        Name,
        Email,
        Subject,
        PhoneNumber,
        Message,
   })
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const DeleteData=async(req, res)=>{
    try {
        const [result] = await pool.query('DELETE FROM ContactUsForm WHERE id=?', [req.params.id])
        if(result.affectedRows <= 0){
            return res.status(404).json({message: 'Data no found'})
        }
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}

export const updateData = async(req, res)=>{
    try {
        const { id } = req.params;
        const {Name, Email, Subject, PhoneNumber, Message}=req.body
    
        const [result] = await pool.query(
          "UPDATE ContactUsForm SET Name = IFNULL(?, Name), Email = IFNULL(?, Email), Subject= IFNULL(?, Subject),PhoneNumber = IFNULL(?, PhoneNumber), Message= IFNULL(?, Message)  WHERE id = ?",
          [Name, Email, Subject, PhoneNumber, Message, id]
        );
    
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "data not found" });
    
        const [rows] = await pool.query("SELECT * FROM ContactUsForm WHERE id = ?", [
          id,
        ]);
    
        res.json(rows[0]);
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }
}

