const { Result } = require('../models')

module.exports = {

  async search(req, res) {
    try {
      const results = await Result.findAll({
        limit: 10
      })
      res.send(results)
    } catch (err) {
      res.status(500).send({
        error: 'an error is occur when fethcing the results'
      })
    }
  },

  async searchById(req, res) {
    try {
      const result = await Result.findById(req.params.resultId)
      res.send(result)
    } catch (err) {
      res.status(500).send({
        error: 'an error is occur when fethcing the results'
      })
    }
  },

  async save(req, res) {
    try {
      const result = await Result.create(req.body)
      res.send(result)
    } catch (err) {
      res.status(500).send({
        error: 'an error is occur when creating the result'
      })
    }
  }    
}