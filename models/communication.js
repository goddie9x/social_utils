const mongoose = require('mongoose');
const COMMUNICATION = require('../constants/communication');

const Schema = mongoose.Schema;

const CommunicationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    target: {
        targetId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        targetType: {
            type: Number,
            required: true,
            enum: COMMUNICATION.TARGET_TYPE
        },
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
        enum: Object.values(COMMUNICATION.CONTENT_TYPE),
        required: true
    },
    hide: [{
        type: Schema.Types.ObjectId,
        required: true,
    }],
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