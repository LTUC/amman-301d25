'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios')

const server = express();
const PORT = process.env.PORT;

server.use(cors());

let inMemory = {};

// Routes
server.get('/test', testHandler)
server.get('/getPhotos', getPhotosHandler);


// Function Handlers
function testHandler(req, res) {
    res.send('all good');
}


function getPhotosHandler(req, res) {
    let sQuery = req.query.searchQuery;
    // https://api.unsplash.com/search/photos?query=office&client_id=aMXXjKn7RNxE6iy2Rlyxofb2ssKogf8NvcAQYm3NElM
    let url = `https://api.unsplash.com/search/photos?query=${sQuery}&client_id=${process.env.UNSPLASH_KEY}`

    if(inMemory[sQuery] !== undefined) {
        console.log('we got the data from our server')
        res.send(inMemory[sQuery]);
    } else {
        axios
        .get(url)

        .then(photoData=>{
            // console.log(photoData.data)
            console.log('send request to unsplash API')
            inMemory[sQuery] = photoData.data.results
            res.send(photoData.data.results) 
        })
        .catch(error=>{
            res.status(500).send(error)
        })
    }

}


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})