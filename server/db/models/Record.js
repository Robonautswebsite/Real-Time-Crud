const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    empName: {
        type: String,
        trim: true,
        required: true
    },
    empId: {
        type: Number,
        trim: true,
        required: true,
        unique: true,
    },
    empPos: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record