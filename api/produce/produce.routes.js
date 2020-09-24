const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { getProduce, getProduces, deleteProduce, deleteProduces, updateProduce, addProduce} = require('./produce.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getProduces);
router.get('/:id', getProduce);
router.post('/', addProduce); //requireAuth
router.put('/:id', requireAuth, updateProduce)
router.delete('/bulk', deleteProduces);
router.delete('/:id', deleteProduce) // require admin, auth

module.exports = router