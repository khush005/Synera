const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    video: {
        type: String
    },
    pdf: {
        type: String
    },
    audio: {
        type: String
    },
    like:{
        type: Array,
    },
    dislike:{
        type: Array,
    },
    comments:[
        {
            user:{
                type : mongoose.Schema.Types.ObjectId ,
                required: true
            },
            username:{
                type: String,
                required: true
            },
            profile:{
                type: String
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model("Post", PostSchema);