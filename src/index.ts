import express from "express"
import maria from "mariadb"
import { router } from "./router"

const app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded())
app.use("/",router)

app.listen(5000,()=>{
    console.log(`connected to port 5000`)
})