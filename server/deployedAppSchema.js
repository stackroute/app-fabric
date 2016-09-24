var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/appfabric');
var Schema = mongoose.Schema;

var deployedAppSchema = new Schema({
    appName: String,
    dns: { type: String },
    services: [{
        serviceName: String,
        replicas: Number
    }],
    created_at: Date,
    updated_at: Date
});

deployedAppSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

var deployedAppModel = mongoose.model('deployedAppModel', deployedAppSchema);

module.exports = deployedAppModel;
