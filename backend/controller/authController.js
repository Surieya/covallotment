import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { getToken } from '../utils/jwt.js';
import pool from '../database.js';



const createUser = expressAsyncHandler(async(req,res) => {
    const { name, age, email, password } = req.body;
    console.log(req.body);
    const data = await pool.query('SELECT * FROM users WHERE email=$1',[email]);
    if (data.rows.length > 0) {
        res.status(403);
        throw new Error('user with ths email already exist please login');

    } else {
        const pass = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users(name,age,email,password,details) VALUES($1,$2,$3,$4,$5) RETURNING *', [name, age, email, pass,{}]);
        return res.status(201).json(
              result.rows[0]
        )
    }


    

})

const loginUser = expressAsyncHandler(async (req, res) => {
    const { name,email, password } = req.body;
    
    const data = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (data.rows.length != 0) {
        if (!(await bcrypt.compare(password, data.rows[0].password))) {
            res.status(401)
            throw new Error('Password Incorrect');
        } else {
            
            const accessToken = getToken(data.rows[0].name, data.rows[0].email, data.rows[0].id,false);
            // console.log(data);
            return res.status(200).json({
                name: data.rows[0].name,
                age: data.rows[0].age,
                accessToken: accessToken,
                isAdmin:false
            }
                
            )

        }
        // res.status(403);
        // throw new Error('user with ths email already exist please login');
    } 
})

const loginAdmin = expressAsyncHandler(async (req, res) => {
    const { name, password} = req.body;

    if (name != 'admin') {
        res.status(200);
        throw new Error(' Forbidden');
    }
    
    const data = await pool.query('SELECT * FROM users WHERE name=$1', [name]);

    if (data.rows[0].name != name || !(await bcrypt.compare(password, data.rows[0].password))) {
        res.status(401)
        throw new Error('Invalid Admin Credentials');
    } else {
        const accessToken = getToken(data.rows[0].name, data.rows[0].email, data.rows[0].id,true);
        
        return res.status(200).json({
            name: data.rows[0].name,
            // age: data.rows[0].age,
            accessToken: accessToken,
            isAdmin:true,
                
        })
    }
})

export {createUser,loginUser,loginAdmin}