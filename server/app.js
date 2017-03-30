var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;

var collection;
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
	if (err) console.log('err', err);
	collection = db.collection('test');
});

app.use('/', express.static('public'));

app.get('/dogs', function(req, res, next) {
	collection.aggregate([{$sample: {size: 2}}]).toArray(function(err, items) {
		res.json(items);
	});;
});

app.post('/dogs', function(req, res, next) {
	
	if (req.body.winner && req.body.loser) {
		console.log('winner', req.body.winner);
		console.log('loser', req.body.loser);
		collection.update(
			{ _id: new ObjectId(req.body.winner) }, 
			{ $inc: {wins: 1, total: 1} }
		);
		collection.update(
			{ _id: new ObjectId(req.body.loser) }, 
			{ $inc: { total: 1} }
		);
		res.send('done');
	} else {
		res.send('missing winner or loser id');
	}
	
});

app.post('/add-dog', function(req, res, next) {
	var url = req.body.url;
	if (url) {
		collection.insert({
			url: url,
			wins: 0,
			total: 0
		});
		res.send('done deal');
	} else {
		res.send('send a url, bro');
	}
});

app.get('/all', function(req, res, next) {
	collection.find().toArray(function(err, items) {
		res.json(items);
	});	
});

app.get('/delete', function(req, res, next) {
	collection.remove();
	req.json({success: true});
});

app.listen(3000, function() {
	console.log("App is listening on port 3000");
});
