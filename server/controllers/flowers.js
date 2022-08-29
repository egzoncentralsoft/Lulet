const { pool } = require('../DB_config');

const getFlower = async (req,res)=>{
    try {
        const flowers = await pool.query(`Select * from flowers order by id ASC`);
        res.json(flowers.rows)
    } catch (error) {
        console.log(error)
    }
}

const getFlowerbyID =  async (req,res)=>{
    try {
        const { id } = req.params;
        const flowers = await pool.query('Select * from flowers where id = $1',[id]);
        res.json(flowers.rows)
    } catch (error) {
        console.log(error);
    }
}

const createFlowers = async (req,res)=>{
    try {
        const {name, price, img, category, description} = req.body;
        const flowers = await pool.query('insert into flowers (name,price,img,category,description) values ($1,$2,$3,$4,$5)',[name,price,img,category,description])
        res.json(flowers.rows[0])
    } catch (error) {
        console.log(error);
    }
}

const UpdateFlowers =  async (req,res)=>{
    try {
        const { id } = req.params;
        const {name, price, img, category, description } = req.body;
        const flowers = await pool.query('Update flowers set name = $1, price = $2, img = $3, category = $4, description = $5 where id = $6',
        [name, price, img, category, description,id]);
        res.json(flowers.rows)
        
    } catch (error) {
        console.log(error);
    }
}

const deleteFlowers = async(req,res)=>{
    try {
        const { id } = req.params;
        const flowers = await pool.query('Delete from flowers where id = $1',[id]);
        res.json('was deleted sucessfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFlower,
    getFlowerbyID,
    createFlowers,
    UpdateFlowers,
    deleteFlowers
};