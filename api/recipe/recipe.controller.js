const recipeService = require('./recipe.service')
const logger = require('../../services/logger.service')

async function getRecipe(req, res) {
    const recipe = await recipeService.getById(req.params.id)
    res.send(recipe)
}
  
async function getRecipes(req, res) {
    const recipes = await recipeService.query(req.query)
    //logger.debug(recipes);
    res.send(recipes)
}

async function addRecipe(req, res) {
    const recipe = req.body;
    const addedRecipe = await recipeService.add(recipe);
    res.send(addedRecipe);
}

async function deleteRecipe(req, res) {
    await recipeService.remove(req.params.id)
    res.end()
}

async function deleteRecipes(req, res) {
    await recipeService.removeAll();
    res.end()
}

async function updateRecipe(req, res) {
    const recipe = req.body;
    const updatedRecipe = await recipeService.update(recipe)
    res.send(updatedRecipe)
}

async function putRecipes(req, res){
    const recipes = req.body;
    const putRecipes = await recipeService.updateBulk(recipes);
    res.send(putRecipes);
}

module.exports = {
    getRecipe,
    getRecipes,
    addRecipe,
    deleteRecipe,
    deleteRecipes,
    updateRecipe,
    putRecipes
}