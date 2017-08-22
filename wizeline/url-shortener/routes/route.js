const express = require('express');
const router = express.Router();
const base58 = require('../base58');
//get object DB Schema
const URL = require('../models/urls');

//shorten URL
router.post('/shorten', (req,res,next)=>{
  var poriginal = req.body.url;
  var pshortened =  makeShortenedURL();
  var pcreated_at = req.body.date;
  let newURL = new URL({
    original:poriginal,
    shortened:pshortened,
    created_at: pcreated_at
  });
  console.log(newURL);
  newURL.save((err, url)=>{
    if(err){
      //res.json({msg:'Failed to add url '+err});
    }else{
      //res.json({msg:'URL added succesfully '});
      res.send({'shortUrl': pshortened});
    }
  });

});


//GET all URLs
router.get('/urls',(req,res,next)=>{
  URL.find(function(err, urls){
    res.json(urls);
  });
});

//GET shortened URL
router.get('/url/:shortened', function(req, res){
  //se obtiene el "corto" desde el request
  var shortenedURL = req.params.shortened;
  //se obtiene uno
  URL.findOne({shortened:shortenedURL},function(err, result){
    if(result){
      console.log('SI se encontró url corta: ' + result.original + ' shortened: '+shortenedURL);
      res.redirect(result.original);
    }else{
      console.log('no se encontró url corta');
      res.redirect('http://localhost:3000');
    }
  });
});

//CREATE an URL
router.post('/url',(req,res,next)=>{
  let newURL = new URL({
    original:req.body.original,
    shortened:req.body.shortened,
    created_at: req.body.created_at
  });
  newURL.save((err, url)=>{
    if(err){
      res.json({msg:'Failed to add url '+err});
    }else{
      res.json({msg:'URL added succesfully '});
    }
  });
});

//DELETE an URL
router.delete('/url/:id',(req,res,next)=>{
  URL.remove({_id:req.params.id},function(err, result){
    if(err){
      res.json('There was an error deleting URL'+err);
    }else{
      res.json('URL was deleted'+result);
    }
  });
});

//funtion for redirecting from inexistent routes/
router.get('*', function(req, res){
  res.redirect('http://localhost:3000');
});


//function for generating random URL 58^6 = 38036'000,000
function makeShortenedURL() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


module.exports = router;
//
