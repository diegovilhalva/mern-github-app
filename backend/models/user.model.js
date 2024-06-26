import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ""
    },
    profileUrl: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    likedProfiles: {
        type: [String],
        default: []
    },
    likedBy: [
        {
            username: {
                type: String,
                required: true
            },
            avatarUrl: {
                type: String,
                required: true
            },
            likedDate: {
                type: Date,
                default: Date.now()
            }
        }
    ]
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User;
