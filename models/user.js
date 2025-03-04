const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:4,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        max:60,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User" , UserSchema);