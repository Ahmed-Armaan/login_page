"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mariadb_1 = __importDefault(require("mariadb"));
const pool = mariadb_1.default.createPool({
    host: '127.0.0.1',
    user: 'ahmed',
    password: '104050',
    database: 'custom'
});
function connectdb() {
    pool.getConnection()
        .then((conn) => {
        conn.query('SELECT * FROM users')
            .then((table) => {
            console.log(table);
        });
    });
}
function adddb(a, b) {
    pool.getConnection()
        .then((conn) => {
        conn.query(`INSERT INTO users(name,password) VALUE("${a}",${b})`);
    });
}
function checkdb(a, b) {
    return pool.getConnection()
        .then((conn) => {
        return conn.query(`SELECT * FROM users WHERE name="${a}"`)
            .then((exist) => {
            if (exist.length === 0)
                return 0;
            else {
                if (exist[0].name === a && exist[0].password === b)
                    return 1;
            }
        });
    });
}
const app = (0, express_1.default)();
app.use(express_1.default.static(__dirname + '/public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/signup', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    adddb(user, pass);
    res.redirect('/');
});
app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    console.log(pass);
    checkdb(user, pass)
        .then((check) => {
        if (check === 0)
            res.redirect('/');
        if (check === 1)
            res.redirect('/in');
    });
});
app.get('/in', (req, res) => {
    res.send('yo you logged in');
});
app.listen(5000, () => {
    console.log(`connected to port 5000`);
});
