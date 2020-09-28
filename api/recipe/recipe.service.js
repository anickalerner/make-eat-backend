
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add,
    putRecipes,
    removeAll
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('recipe')
    try {
        const recipes = await collection.find(criteria).toArray();
        // recipes.forEach(recipe => delete recipe.password);

        return recipes
    } catch (err) {
        console.log('ERROR: cannot find recipes')
        throw err;
    }
}

async function getById(recipeId) {
    const collection = await dbService.getCollection('recipe')
    try {
        const recipe = await collection.findOne({ "_id": ObjectId(recipeId) })
        delete recipe.password

        recipe.givenReviews = await reviewService.query({ byRecipeId: ObjectId(recipe._id) })
        recipe.givenReviews = recipe.givenReviews.map(review => {
            delete review.byRecipe
            return review
        })


        return recipe
    } catch (err) {
        console.log(`ERROR: while finding recipe ${recipeId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('recipe')
    try {
        const recipe = await collection.findOne({ email })
        return recipe
    } catch (err) {
        console.log(`ERROR: while finding recipe ${email}`)
        throw err;
    }
}

async function remove(recipeId) {
    const collection = await dbService.getCollection('recipe')
    try {
        await collection.deleteOne({ "_id": ObjectId(recipeId) })
    } catch (err) {
        console.log(`ERROR: cannot remove recipe ${recipeId}`)
        throw err;
    }
}

async function removeAll(recipeId) {
    const collection = await dbService.getCollection('recipe')
    try {
        await collection.deleteMany()
    } catch (err) {
        console.log(`ERROR: cannot remove recipe ${recipeId}`)
        throw err;
    }
}

async function update(recipe) {
    const collection = await dbService.getCollection('recipe')
    recipe._id = ObjectId(recipe._id);

    try {
        console.log('before update recipe', recipe);
        await collection.replaceOne({ "_id": ObjectId(recipe._id) }, { $set: recipe })
        console.log('after update recipe', recipe);
        return recipe
    } catch (err) {
        console.log(`ERROR: cannot update recipe ${recipe._id}`)
        throw err;
    }
}

async function putRecipes(recipes){
    const collection = await dbService.getCollection('recipe');
    try {
        await collection.insert(recipes);
        return recipes;
    } catch (err) {
        console.log(`ERROR: cannot bulk insert recipes`)
        throw err;
    }
}

async function add(recipe) {
    const collection = await dbService.getCollection('recipe')
    try {
        await collection.insertOne(recipe);
        return recipe;
    } catch (err) {
        console.log(`ERROR: cannot insert recipe`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    // if (filterBy.txt) {
    //     criteria.recipe.name = filterBy.txt
    // }
    // if (filterBy.minBalance) {
    //     criteria.balance = { $gte: +filterBy.minBalance }
    // }
    return criteria;
}


