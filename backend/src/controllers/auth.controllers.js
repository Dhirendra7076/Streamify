import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import { validateFields } from "../utils/validateFields.js";


export async function signup(req,resp){

    console.log("Body:" , req.body)
    const {email , password , fullName} = req.body

    try {
        if(!email || !fullName || !password) 
            return resp.status(400).json({message: "All fields are required"})

        if(password.length<8) 
            return resp.status(400).json({message: "Password must be atleast six characters"})

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //emailRegex is a regular expression (RegEx) used to validate whether a string is in proper email format.

//So it ensures:
// There is something before @
// There is something after @
// There is a dot after domain
// No spaces 
// No multiple @

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
}

        const existingUser = await User.findOne({email})
        if(existingUser){
            return resp.status(400).json({message: `Email already exists : ${existingUser}`})
        }

        const idx = Math.floor(Math.random()*100) +1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            email , 
            fullName,
            password, 
            profilePic: randomAvatar,
        })
        console.log("new user created" , newUser)

        try {  //no need for the try and catch block can also directly write the try part seperately
            await upsertStreamUser({
            id : newUser._id.toString(), 
            name : newUser.fullName,
            image: newUser.profilePic || "",
        })
        console.log(`Steam user created for ${newUser._id}`)
        } catch (error) {
            console.error("Error creating stream user" , error)
        }

        const token = jwt.sign({userId: newUser._id} , process.env.JWT_SECRET_KEY , {
            expiresIn: "7d"
        })

        resp.cookie("jwt" , token , {
            maxAge: 7*24*60*60*1000,
            httpOnly: true , //prevent XSS attacks  ✅ Very important for security.// Prevents JavaScript from accessing the cookie. Means document.cookie cannot read it. Why? To prevent XSS (Cross-Site Scripting) attacks. If a hacker injects malicious JS into your site, they cannot steal the JWT.
            sameSite: "strict" , //prevent CSRF  attacks With "strict":
                                                                // Cookie is only sent when request comes from the same site.
                                                                // If another website tries to send a request to your backend → cookie won’t be included.
            secure: process.env.NODE_ENV==="production"

        })

        resp.status(201).json({success:true , user: newUser})
    } catch (error) {
        console.error("Error in signup controller" , error)
        resp.status(500).json({message: error.message})
    }

    
}

export async function login(req,resp){
    try {
        const {email , password} = req.body;

        if(!email || !password) return resp.status(400).json({message: "All fields are required"})

        const user = await User.findOne({email});
        if(!user) return resp.status(401).json({message: "Check the credentials"})

        const isPasswordCorrect = await user.matchPassword(password)
        if(!isPasswordCorrect) return resp.status(401).json({message: "Check the credentials"})

        const token = jwt.sign({id: user._id} , process.env.JWT_SECRET_KEY , {
            expiresIn: "7d"
        })

        resp.cookie("jwt" , token , {
            maxAge: 7*24*60*60*1000,
            httpOnly: true , //prevent XSS attacks  ✅ Very important for security.// Prevents JavaScript from accessing the cookie. Means document.cookie cannot read it. Why? To prevent XSS (Cross-Site Scripting) attacks. If a hacker injects malicious JS into your site, they cannot steal the JWT.
            sameSite: "strict" , //prevent CSRF  attacks With "strict":
                                                                // Cookie is only sent when request comes from the same site.
                                                                // If another website tries to send a request to your backend → cookie won’t be included.
            secure: process.env.NODE_ENV==='production'

        })

        resp.status(200).json({success: true , user})
     
    } catch (error) {
        console.log("Error in login controller" , error)
        resp.status(500).json ({message: "Interval server error"})
    }
}

export async function logout(req,resp){
    resp.clearCookie("jwt")
    resp.status(200).json({success: true , message: "Logout successful"})
}

export async function onboard(req, resp){
    console.log(req.user) //yeh req.user humne protectRoute middleware me set kiya tha
    const userId = req.user._id
    const {fullName , bio , nativeLanguage , learningLanguage , location} = req.body

    const requiredFields = [
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
]

const missingFields = validateFields(req.body , requiredFields)

if(missingFields>0)
return resp.status(400).json({
    message: "All fields are required" , 
    missingFields
})


    if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location)
        return resp.status(400).json({
                                        message: "All fields are required", 
                                        missingFields: [ //this tells what fields are missing
                                            !fullName && fullName,
                                            !bio && bio,
                                            !nativeLanguage && nativeLanguage,
                                            !learningLanguage && learningLanguage,
                                            !location && location,
                                        ].filter(Boolean) //to get only the true values
                                         ,
                                    })

    const updatedUser = await User.findByIdAndUpdate(userId , {
       // fullName , bio , location , .... instead of typing all this out you write the following 
       ...req.body,
       isOnboarded: true,
    } , {new:true})//how over new to know what it does

    if(!updatedUser) 
        return resp.status(400).json({message: "User not found"})



    resp.status(200).json({success : true , user: updatedUser})


    //TODO : to update the user info in stream
        

    try {
        
    } catch (error) {
        console.log("Onboaring error" , error)
        resp.status(500).json({message : "Internal server error"})
    }
}

//async
// Normally, JavaScript runs line by line.
// But some tasks take time:
// Fetching data from database
// Calling an API
// Reading a file
// If JS waited for these, the whole app would freeze.
// So we use async to make it non-blocking.