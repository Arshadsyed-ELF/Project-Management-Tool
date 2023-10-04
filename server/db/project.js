const mongoose = require('mongoose');

const projectScheme = new mongoose.Schema({
    title:String,
    description:String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
})

module.exports =mongoose.model('project',projectScheme)

