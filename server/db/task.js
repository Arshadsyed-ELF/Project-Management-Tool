const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {type: String,required: true},
  description:String,
  status: {type: String,enum: ['todo', 'inProgress', 'completed'],required: true,},
  position: {type: Number,default: 0, },
  subtasks: [{ title: String, completed: Boolean,  assignedTo:String,}],
  userName:String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  assigneduser:String,
 

  registrationDate: {
    type: String, // Store dates as strings
    default: () => new Date().toLocaleDateString('hi-IN'), // Set the default value to the current date in "MM/DD/YYYY" format
},
});

module.exports = mongoose.model('Task', taskSchema);
