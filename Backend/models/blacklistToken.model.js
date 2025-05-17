const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires : '24h' // Token will expire after 24 hours
    }
});

const blacklistTokenModel = mongoose.model('BlacklistToken', tokenSchema);

module.exports = blacklistTokenModel;

