const express = require('express');
const app = express();
const config = require('config');
const process = require('process');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();
const bodyParser = require('body-parser');
var cors = require('cors');

const port = config.get('Server.port');

/*app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); */
app.use(express.json());
app.use(upload.array()); 

const corsOptions = {
  origin: (origin,callback) => {
    callback(null,true);
  }
};

app.use(cors(corsOptions));

app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
app.use('/api/notify', require('./routes/notify'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

mongoose.connect(config.get('Database.path'), {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })  
});

