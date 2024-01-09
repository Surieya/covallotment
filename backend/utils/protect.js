import expressAsyncHandler from 'express-async-handler'
import pool from '../database.js'
import { decodeToken } from './jwt.js'



const protect = expressAsyncHandler(async (req, res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403);
        throw new Error('Invalid authHeader');
    }
    console.log(authHeader);
    const accessToken = authHeader.split(' ')[1];
    try {
        // console.log({ accessToken });
        const decoded = decodeToken(accessToken);
        console.log(decoded);


        const { name, email, id, isAdmin } = decoded;
        
        const foundUser = await pool.query('SELECT * FROM users WHERE id=$1',[id]);

        if (foundUser.rows.length == 0) {
            res.status(403)
            throw new Error('User not Valid');
        }

        req.user = {
            id: foundUser.rows[0].id,
            name: foundUser.rows[0].name,
            email: foundUser.rows[0].email,
            isAdmin:isAdmin
        }
        next();
        
    } catch (error) {
        res.status(403);
        throw new Error('Fobidden from protect');
    }

})

export {
    protect
}