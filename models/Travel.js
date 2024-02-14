const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    destination:String,
    startDate:Date,
    returnDate:Date,
    description:String,
    capacity:Number,
})

const Travel = new mongoose.model('Travel',travelSchema);

module.exports=Travel;