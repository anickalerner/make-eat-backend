
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    putProduces,
    removeAll
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('produce')
    try {
        const produces = await collection.find(criteria).toArray();
        // produces.forEach(produce => delete produce.password);

        return produces
    } catch (err) {
        console.log('ERROR: cannot find produces')
        throw err;
    }
}

async function getById(produceId) {
    const collection = await dbService.getCollection('produce')
    try {
        return await collection.findOne({ "_id": ObjectId(produceId) })
    } catch (err) {
        console.log(`ERROR: while finding produce ${produceId}`)
        throw err;
    }
}

async function remove(produceId) {
    const collection = await dbService.getCollection('produce')
    try {
        await collection.deleteOne({ "_id": ObjectId(produceId) })
    } catch (err) {
        console.log(`ERROR: cannot remove produce ${produceId}`)
        throw err;
    }
}

async function removeAll(produceId) {
    const collection = await dbService.getCollection('produce')
    try {
        await collection.deleteMany()
    } catch (err) {
        console.log(`ERROR: cannot remove produce ${produceId}`)
        throw err;
    }
}

async function update(produce) {
    const collection = await dbService.getCollection('produce')
    produce._id = ObjectId(produce._id);

    try {
        await collection.replaceOne({ "_id": produce._id }, { $set: produce })
        return produce
    } catch (err) {
        console.log(`ERROR: cannot update produce ${produce._id}`)
        throw err;
    }
}

async function putProduces(produces){
    const collection = await dbService.getCollection('produce');
    try {
        await collection.insert(produces);
        return produces;
    } catch (err) {
        console.log(`ERROR: cannot bulk insert produces`)
        throw err;
    }
}

async function add(produce) {
    const collection = await dbService.getCollection('produce')
    try {
        await collection.insertOne(produce);
        return produce;
    } catch (err) {
        console.log(`ERROR: cannot insert produce`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    // if (filterBy.txt) {
    //     criteria.produce.name = filterBy.txt
    // }
    // if (filterBy.minBalance) {
    //     criteria.balance = { $gte: +filterBy.minBalance }
    // }
    return criteria;
}


