import app from "./app.js";
import { PORT } from './config.js'
import cors from 'cors'

app.use(cors())
app.listen(PORT)

console.log("Server running on port", PORT)