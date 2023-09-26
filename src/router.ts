import express from "express"
import maria from "mariadb"

const pool = maria.createPool({
    host : '127.0.0.1',
    user : 'ahmed',
    password : '104050',
    database : 'custom'
})

const router = express.Router()

function connectdb():void{
    pool.getConnection()
    .then((conn)=>{
        conn.query('SELECT * FROM users')
        .then((table)=>{
            console.log(table)
        })})
}
function adddb(a:string,b:string):void{
    pool.getConnection()
    .then((conn)=>{
        conn.query(`INSERT INTO users(name,password) VALUE("${a}",${b})`)})
}
function checkdb(a:string,b:string):Promise<number | undefined>{
    return pool.getConnection()
    .then((conn)=>{
        return conn.query(`SELECT * FROM users WHERE name="${a}"`)
        .then((exist)=>{
            if(exist.length === 0)
                return 0
            else{
                if(exist[0].name === a && exist[0].password === b)
                    return 1
            }
        })
    })
}

router.get('/',(req,res)=>{
    // connectdb()
    res.sendFile(__dirname+'/index.html')
})
router.post('/signup',(req,res)=>{
    const user:string = req.body.username
    const pass:string = req.body.password
    adddb(user,pass)
    res.redirect('/')
})
router.post('/login',(req,res)=>{
    const user:string = req.body.username
    const pass:string = req.body.password
    console.log(pass)
    checkdb(user,pass)
    .then((check:any)=>{
        if(check === 0)
            res.redirect('/')
        if(check === 1)
            res.redirect('/in')
    })
})
router.get('/in',(req,res)=>{
    res.send('yo you logged in')
})

export {router}