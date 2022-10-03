const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const flowers = require('./routes/flowers');
const { pool } = require('./DB_config');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
}) */

app.get('/',(req,res)=>{
    res.send('Main Page');
})

app.use('/api/flowers',flowers);

app.get('/users/login', (req,res)=>{
    res.send('login page');
})

app.post('/users/register',async (req,res)=>{
    const { name, email, password} = req.body;
    
    if(!name || !email || !password){
        res.json('please fill all inputs');
    }
    if(password.length<6){
        res.json('password must be longer than 6 letters')
    }else{
        let hashedPassword = await bcrypt.hash(password,10);
        let email1= email.toLowerCase();

        pool.query('select * from users where email=$1',[email1],
        (err,result)=>{
            if(err){ 
                throw err;
            }
            console.log(result.rows)
            if(result.rows.length>0){
                res.json('email already exist');
            }else{
                pool.query('insert into users (name,email,password) values ($1,$2,$3)',[name,email1,hashedPassword],
                (err,result)=>{
                    if(err){throw err;}
                    res.json(result.rows)
                });
            }
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
});