var mongoose = require('mongoose')
var _ = require('lodash')
var Task;
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  // setup schema here
  parent: { type: Schema.Types.ObjectId, ref: 'Task'},
  name: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
  due: Date
  
});

//virtuals

TaskSchema.virtual('timeRemaining').get(function() {
	if(!this.due) return Infinity;
	var d = new Date();
	return Math.abs(d.getTime()-this.due.getTime());
	
})

TaskSchema.virtual('overdue').get(function() {
	var d = new Date();
	if(!this.complete) return this.due.getTime() < d.getTime();
	else return false;
})

//methods

TaskSchema.methods.addChild = function(params) {
	console.log(this.create(params))
	return this.create(params);
	// return this.Task.insert(params).then();
}

TaskSchema.methods.getChildren = function() {
	return this.find();
}

TaskSchema.methods.getSiblings = function() {
	return this.find({parent : {$eq: parent}})
}

Task = mongoose.model('Task', TaskSchema);


module.exports = Task;