const mongoose = require('mongoose');

let CharacterModel = {};

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Untitled Character",
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    tags: [{
        type: String
    }],
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

// Converts a doc to something we can store in redis later on.
CharacterSchema.statics.toAPI = (doc) => ({
    _id: doc._id,
});

CharacterModel = mongoose.model('Character', CharacterSchema);

module.exports = {
    Character: CharacterModel
};