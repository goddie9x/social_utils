const mongoose = require('mongoose');
const COMMUNICATION = require('../constants/communication');

const Schema = mongoose.Schema;

const CommunicationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    target: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    replyTo: {
        type: Schema.Types.ObjectId,
    },
    content: {
        type: String,
        required: true
    },
    contentType: {
        type: Number,
        enum: Object.values(COMMUNICATION),
        required: true
    },
    hide: {
        type: Boolean,
        default: false
    },
    removed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

module.exports = CommunicationSchema;