const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { getRecipe, getRecipes, deleteRecipe, deleteRecipes, updateRecipe, addRecipe} = require('./recipe.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getRecipes)
router.get('/:id', getRecipe)
router.post('/', addRecipe) //requireAuth
router.put('/:id', updateRecipe) //requireAuth
router.delete('/bulk', deleteRecipes) // require admin, auth
router.delete('/:id', deleteRecipe) // require admin, auth

module.exports = router