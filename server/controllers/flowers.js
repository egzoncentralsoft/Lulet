const { pool } = require('../DB_config');
const admin = require("firebase-admin");
const serviceAccount = require('../firebase-key.json');

const BUCKET = "lulet-d3cc2.appspot.com"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const uploadImage = (req,res,next) =>{
  if(!req.file) return next();
        const img = req.file;
        const name = Date.now() + "." + img.originalname.split(".").pop();
        const file = bucket.file(name);
        
        const stream = file.createWriteStream({
            metadata: {
                contentType: img.mimetype,
            },
        });
        stream.on('error',(e)=>{
          console.error(e);
        })
        stream.on("finish", async () => {
        await file.makePublic()
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${name}`;
        next();
        })
        stream.end(img.buffer)
}


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
        console.log(req.file);
        const {name, price,category, description} = req.body;
        const img1 = req.file.firebaseUrl
        const flowers = await pool.query('insert into flowers (name,price,img,category,description) values ($1,$2,$3,$4,$5)',
        [name,price,img1,category,description])
        res.json(flowers.rows[0])
    } catch (error) {
        console.log(error);
    }
} 

const UpdateFlowers =  async (req,res)=>{
    try {
        const { id } = req.params;
        const {name, price, img,category, description } = req.body;
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
    deleteFlowers,
    uploadImage
};