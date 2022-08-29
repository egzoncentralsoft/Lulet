const express = require('express');
const router = express.Router();

const {
    getFlower,
    getFlowerbyID,
    createFlowers,
    UpdateFlowers,
    deleteFlowers
} = require('../controllers/flowers')

router.get('/', getFlower)

router.get('/:id', getFlowerbyID)

router.post('/', createFlowers)

router.put('/:id', UpdateFlowers) 

router.delete('/:id', deleteFlowers)

module.exports = router;