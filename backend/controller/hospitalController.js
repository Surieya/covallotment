import expressAsyncHandler from 'express-async-handler'
import pool from '../database.js'



const createHospital = expressAsyncHandler(async (req, res) => {
    const { name, city, area, address, details } = req.body;
    const { isAdmin } = req.user;
    console.log(req.body);
     if (!isAdmin) {
        res.status(403)
        throw new Error('Forbidded');
    }
    console.log(details);
    const result = await pool.query('SELECT * FROM hospitals WHERE name=$1 AND city=$2 AND area=$3 ', [name, city, area])

    // console.log(result.rows[0]);

    if (result?.rows[0]?.length > 0) {
        res.status(400)
        throw new Error('Duplicate Entry');
    } else {
      const data = await pool.query('INSERT INTO hospitals(name,city,area,address,details) VALUES($1,$2,$3,$4,$5) RETURNING *',[name,city,area,address,details])

    return res.status(201).json(
        data.rows[0]
    )  
    }
    

})

const getAllHospital = expressAsyncHandler(async (req, res) => {
    const data = await pool.query('SELECT * FROM hospitals');
    
    return res.status(200).json(
        data.rows
    )
})

const getAllHospitalCities = expressAsyncHandler(async (req, res) => {
    const data = await pool.query('SELECT DISTINCT city FROM hospitals');

    return res.status(200).json(
       data.rows[0]
    )
})

const getSingleHospital = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    
    const data = await pool.query('SELECT * FROM hospitals WHERE id=$1', [id]);

    return res.status(200).json(
        data.rows[0]
    )
})

const updateHospital = expressAsyncHandler(async (req, res) => {
    // const { name, id, isAdmin } = req.user;
    const { id: hosId } = req.params;
    const { details } = req.body;

    const data = await pool.query('UPDATE hospitals SET details=$1 WHERE id=$2 RETURNING *',[details,hosId])
    // const { day,slot,count } = req.query;

    res.status(200).json(
        data.rows[0]
    )

    // const data = pool.query('SELECT * FROM ')
})

const deleteHospital = expressAsyncHandler(async (req, res) => {
    const { name, id, isAdmin } = req.user;
    const { id: hosId } = req.params;
 
    if (!isAdmin) {
        res.status(403)
        throw new Error('Forbidded');
    }
    const data = await pool.query('DELETE FROM hospitals WHERE id=$1 RETURNING *', [hosId]);

    return res.status(200).json(
        data.rows[0]
    )

})

export {
    getAllHospital,
    getSingleHospital,
    getAllHospitalCities,
    updateHospital,
    createHospital,
    deleteHospital
}