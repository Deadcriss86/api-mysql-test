import express from 'express'
import dataRoutes from './routes/datas.routes.js'
import indexRoutes from './routes/index.routes.js'
import cors from 'cors';

const app=express()
app.use(cors());
app.use(express.json())

app.use(indexRoutes)
app.use('/api/',dataRoutes)

app.use((req, res, next)=>{
    res.status(404).json({
        message:'enpoint not found'
    })
})

export default app;