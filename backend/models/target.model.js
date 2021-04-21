const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const targetSchema = new Schema({
    username: {type: String, require: true},
    description: {type: String, require: true},
    duration: {type: Number, require: true},
    priority: {type: String, require: true},
    date: {type: Date, require: true},
    userId: { type: String, require: true},
    sorting: {
        type:Number,
        default: 0
    }
}, {
    timestamps: true,
});

const Target = mongoose.model('Targets', targetSchema);

module.exports = Target;