const {Url} = require('../startup/db_models');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// GET
router.get('/:id', async (req, res) => {
    let url = await Url.findOne({
        ShortId: req.params.id
    })

    if(!url) return res.render('error')
    Url.findOneAndUpdate({ShortId: req.params.id}, (err,doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
    });
    url.save();
    res.writeHead(307, {
        Location: url.inputUrl
    });
    res.end();
});

// POST
router.post('/transfer', async (req, res) => {
    const input = req.body.inputUrl;
    if ((validUrl.isUri(input))) {
        
        let urlExist = await Url.findOne({

            inputUrl: input

        })

        if(urlExist) return res.send(urlExist)

        do{

            short = Math.random().toString(36).substring(8)

            urlFind = await Url.findOne({
                ShortId: short
            })
        
        }while(urlFind != null)

        url = new Url({
            inputUrl: input,
            ShortId: short,
        });

        await url.save();
        res.send(url);  
        console.log('Created New : ', url);
    } else {
        res.status(400).send('Please Enter a Valid URL');
    }
});

module.exports = router;