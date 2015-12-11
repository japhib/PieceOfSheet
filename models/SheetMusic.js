// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Sheet music schema
var sheetMusicSchema = new Schema({
	title: String,
	composer: String,
	filename: String,
	thumbnail_file: String,
	description: String,
	comments: [],
	uploader: String,
});

var SheetMusic = mongoose.model('sheetmusic', sheetMusicSchema);

module.exports = SheetMusic;
