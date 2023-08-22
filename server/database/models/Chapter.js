const mongoose = require('mongoose');

let ChapterModel = {};

const ChapterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Untitled Chapter",
    },
    number: {
        type: Number,
        required: true,
        default: -1,
    },
    content: {
        type: String,
        required: true,
        default: "",
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

// Converts a doc to something we can store in redis later on.
ChapterSchema.statics.toAPI = (doc) => ({
    _id: doc._id,
});

ChapterModel = mongoose.model('Chapter', ChapterSchema);

module.exports = {
    Chapter: ChapterModel
};