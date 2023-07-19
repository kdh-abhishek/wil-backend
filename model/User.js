import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        reuqired: true,
        minlength: 6
    },
    // blogs: [{
    //     type: mongoose.Types.ObjectId, ref: "Blog", required: true
    // }],
    campaigns: [{
        type: mongoose.Types.ObjectId, ref: "Campaign", required: true
    }]
});


export default mongoose.model("User", userSchema);


