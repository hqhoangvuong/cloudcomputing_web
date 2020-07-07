const express = require('express')
var path = require('path');
var cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors()) 
app.use(express.static('../public'))


app.get('/', function(req, res) {
    res.sendFile(path.resolve('../public/index.html'));

});

 app.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})
 
 module.exports = app;