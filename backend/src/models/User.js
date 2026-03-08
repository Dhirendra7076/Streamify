import mongoose  from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({ //mongoose.Schema is used to define the structure (blueprint) of documents that will be stored in a MongoDB collection.
// In simple words:
// Schema = design of how your data should look in the database.
// It tells MongoDB:
// What fields will exist
// What type of data each field stores
// Rules (required, default, min length, etc.)

    fullName: {
        type: String , 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    bio: {
        type: String , 
        
        default: "", //by default it will be empty string
    },
    profilePic:{
        type: String,
        default: "",
    },
    nativeLanguage: {
        type: String,
       
        default: "",
    },
    learningLanguage: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        
    },
    location: {
        type: String,
    },
    isOnboarded: {
        type: Boolean,
        default: false,  //this decides whether a user can visit other pages or not
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
} , {timestamps:true}) //timestamps will give you fields like createdat and upadatedat

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();

    try {
        const salt  = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt)
        
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.matchPassword = async function name(enteredPassword ) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
}


const User = mongoose.model("User" , userSchema);

//pre hook : just before we save a user to our database we want to hash their passwords




export default User;