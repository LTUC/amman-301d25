'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
mongoose.connect('mongodb://localhost:27017/cats', { useNewUrlParser: true, useUnifiedTopology: true });

const kittySchema = new mongoose.Schema({
    name: String,
    breed: String
});

const ownerSchema = new mongoose.Schema({
    name: String,
    cats: [kittySchema]
});

const myCatModel = mongoose.model('kitten', kittySchema);
const myOwnerModel = mongoose.model('owner', ownerSchema);

// function seedKittyCollection() {
//     // const sherry = new myCatModel({
//     //     name:'sherry',
//     //     breed: 'angora'
//     // })
//     const emzeki = new myCatModel({
//         name:'emzeki',
//         breed: 'baladi'
//     })
//     // console.log(sherry);
//     // sherry.save();
//     emzeki.save();
// }
// seedKittyCollection()


function seedOwnerCollection() {
    const razan = new myOwnerModel({
        name: 'razan',
        cats: [
            {
                name: 'sherry',
                breed: 'angora'
            },
            {
                name: 'emzeki',
                breed: 'baladi'
            }
        ]
    })
    const razan2 = new myOwnerModel({
        name: 'razan2',
        cats: [
            {
                name: 'sherry2',
                breed: 'angora'
            },
            {
                name: 'emzeki2',
                breed: 'baladi'
            }
        ]
    })

    // razan.save();
    razan2.save();
}
// seedOwnerCollection();



// proof of life
app.get('/', homePageHandler);

// http://localhost:3001/cat?ownerName=razan
app.get('/cat',getOwnerCatsData);

function getOwnerCatsData(req,res) {
    let ownerName = req.query.ownerName;
    // let {ownerName} = req.query
    myOwnerModel.find({name:ownerName},function(error,ownerData){
        if(error) {
            res.send('did not work')
        } else {
            res.send(ownerData[0].cats)
        }
    })
}


function homePageHandler(req, res) {
    res.send('all good')
}


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})