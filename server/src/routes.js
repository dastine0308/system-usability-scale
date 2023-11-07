const ResultController = require('./controllers/ResultController')

module.exports = (app) => {
  app.get('/results', ResultController.search);      
  app.get('/results/:resultId', ResultController.searchById);      
  app.post('/result', ResultController.save);      
}