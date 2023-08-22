const mongoose = require('mongoose');

let EventModel = {};

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Untitled Event",
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }],
    tags: [{
        type: String
    }],
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

// Converts a doc to something we can store in redis later on.
EventSchema.statics.toAPI = (doc) => ({
    _id: doc._id,
});

EventModel = mongoose.model('Event', EventSchema);

module.exports = {
    Event: EventModel
};