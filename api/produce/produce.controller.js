const produceService = require('./produce.service')
const logger = require('../../services/logger.service')

async function getProduce(req, res) {
    const produce = await produceService.getById(req.params.id)
    res.send(produce)
}
  
async function getProduces(req, res) {
    const produces = await produceService.query(req.query)
    logger.debug(produces);
    res.send(produces)
}

async function addProduce(req, res) {
    const produce = req.body;
    const addedProduce = await produceService.add(produce);
    res.send(addedProduce);
}

async function deleteProduce(req, res) {
    await produceService.remove(req.params.id)
    res.end()
}

async function deleteProduces(req, res) {
    await produceService.removeAll()
    res.end()
}

async function updateProduce(req, res) {
    const produce = req.body;
    const updatedProduce = await produceService.update(produce)
    res.send(updatedProduce)
}

async function putProduces(req, res){
    const produces = req.body;
    const putProduces = await produceService.updateBulk(produces);
    res.send(putProduces);
}

module.exports = {
    getProduce,
    getProduces,
    addProduce,
    deleteProduce,
    deleteProduces,
    updateProduce,
    putProduces
}