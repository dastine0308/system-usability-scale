const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models')

const app = express();
app.use(cors());
app.use(bodyParser.json());

require('./routes')(app)

const PORT = process.env.PORT || 8081;
db.sequelize.sync({ force: true })
  .then(()=> {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
