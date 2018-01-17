const express = require("express"),
      axios = require("axios");

var router = express.Router();

var {mongoose} = require("./../server/db/mongoose.js"),
    {Latest} = require("./../server/model/history.js");

router.get("/:query", function(req, res) {
  var query = req.params.query;
  var offset = req.query.offset || 10;
  var date = new Date();
  
  var url = `https://www.googleapis.com/customsearch/v1?searchType=image&key=${process.env.API_KEY}&cx=${process.env.CX}&q=${query}&num=${offset}`;
  
  axios.get(url).then(function(response) {
    var result;
    var items = response.data.items;
  
    return result = items.map(function(item) {
      return {
        altText: item.snippet,
        imageLink: item.link,
        pageLink: item.image.contextLink
      };
    });
  }).then(function(docs) {
    res.send(docs);
    
    var latest = new Latest({
      query: query,
      time: date
    });
    
    latest.save().then(function() {
      console.log("Saved");
    });
    
  }).catch(function(error) {
    console.log(error);
  });
  
});

router.get("/latest/image", function(req, res) {
  Latest.find({}, {_id: 0}).sort({time: -1}).then(function(docs){
    res.send(docs);
  }).catch(function(error) {
    console.log(error);
  });
});

module.exports = router;



















