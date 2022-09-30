const express = require('express');
const router = express.Router();
const {uploadImage} = require('../controllers/flowers')
const multer = require('multer')

const Multer = multer({
  storage: multer.memoryStorage()
})

const {
    getFlower,
    getFlowerbyID,
    createFlowers,
    UpdateFlowers,
    deleteFlowers
} = require('../controllers/flowers')

router.get('/', getFlower);

router.get('/:id', getFlowerbyID);

router.post('/', Multer.single("img"),uploadImage, createFlowers);

//router.post('/', Multer.single("image"), uploadImage, createFlowers);

router.put('/:id', UpdateFlowers); 

router.delete('/:id', deleteFlowers);

module.exports = router;