const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    description:{
        type: String,
        required:true,
        trim:true,
    },
    completed:{
        type: Boolean,
        default:false
    }
},{
    timestamps: true
})
const Tasks = mongoose.model('Tasks', taskSchema)
module.exports = Tasks