var express = require('express');
var MongoClient = require('mongodb').MongoClient
var async = require('async');
var router = express.Router();

router.get('/', function(req, res, next) {
    get_data_list( function(result) {
        res.render('index', {data:result});
    });
});

router.get('/detail/:id', function(req, res, next) {
    get_data_by_title_id(req.params.id, function(result) {
        res.render('detail', {data:result[0]});
    });
});

function get_data_list(callback){
    var url =g_mongo_url;
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('Titles');
        collection.find({}).toArray(function(err, docs) {
            callback(docs);
        });
        db.close();
    });
}

function get_data_by_title_id(title_id,callback){
    var url =g_mongo_url;
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('Titles');
        collection.find({TitleId:parseInt(title_id)}).toArray(function(err, docs) {
            callback(docs);
        });
        db.close();
    });
}

module.exports = router;
