var express = require('express');
var router = express.Router();
var request = require('sync-request');
const showModel = require('../models/shows');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyTVShowsBackend' });
});

// Get popular shows from TheMovieDatabase API
router.get('/new-series', async (req, res) => {

  const data = await request("GET", `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&sort_by=popularity.desc`);
  const response = JSON.parse(data.body);

  res.json({ result: response.results });
});

// Add show to wishlist
router.post('/wishlist-show', async (req, res) => {

  let newShow = new showModel ({
    showName: req.body.title,
    showImg: req.body.img,
  });
  const show = await newShow.save();

  res.json({ show: show, result: true })
});


// Delete show from wishlist
router.delete('/wishlist-show/:name', async (req, res) => {

  await showModel.deleteOne({showName: req.params.name});

  res.json({ result: true })
});


// Get shows in wishlist
router.get('/wishlist-show', async (req, res) => {

  const wishlist = await showModel.find();

  res.json({ wishlist })
});

module.exports = router;



