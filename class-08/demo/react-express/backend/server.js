'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios')

const server = express();
const PORT = process.env.PORT;

server.use(cors());

//  Routes
server.get('/test', testHandler)
server.get('/getPhotos', getPhotosHandler);


// Function Handlers
function testHandler(req, res) {
    res.send('all good');
}

//localhost:3001/getPhotos?searchQuery=book
// async function getPhotosHandler (req,res) {
//     let sQuery = req.query.searchQuery;
//     // https://api.unsplash.com/search/photos?query=office&client_id=aMXXjKn7RNxE6iy2Rlyxofb2ssKogf8NvcAQYm3NElM
//     let url = `https://api.unsplash.com/search/photos?query=${sQuery}&clientid=${process.env.UNSPLASH_KEY}`

//     try {
//         let photoData = await axios.get(url) 
//         res.send(photoData.data)   
//     } catch(error) {
//         // res.status(500).send(error);
//         res.status(500).send('error in getting data from unsplash api');
//     }

//     console.log('after axios')
//     console.log('after axios')
//     console.log('after axios')
// }


function getPhotosHandler(req, res) {
    let sQuery = req.query.searchQuery;
    // https://api.unsplash.com/search/photos?query=office&client_id=aMXXjKn7RNxE6iy2Rlyxofb2ssKogf8NvcAQYm3NElM
    let url = `https://api.unsplash.com/search/photos?query=${sQuery}&client_id=${process.env.UNSPLASH_KEY}`

    axios
    .get(url)
    .then(photoData=>{
        // console.log(photoData.data)
        res.send(photoData.data.results) 
    })
    .catch(error=>{
        res.status(500).send(error)
    })


    // for (let i =0;i<100000;i++) {
    //     console.log('after axios-1')
    // }
    // console.log('after axios-2')
}


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})