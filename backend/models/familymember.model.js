const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const familymemberSchema = new Schema({
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlenght: 3,
    },
    userId: { type: String, require: true},
},{
    timestamps: true,
});

const Familymember = mongoose.model('Familymember', familymemberSchema);

module.exports = Familymember;