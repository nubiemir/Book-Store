const { where } = require("../model/user")
const User = require("../model/user")

exports.getSignup = (req,res)=>{
    res.render("signup")
}

exports.getSignin = (req,res)=>{
    res.render("signin")
}


exports.postSignup = async(req,res)=>{
    try{
        const {uname,email,password, cpassword} = req.body
        const user = new User({uname, email, password})
        await user.save();
        res.redirect(303, "/fab/signin")

    }catch(err){
        console.log(err.message)
    }
}

exports.postSignin = async(req,res)=>{
    try{
        const {uname, password} = req.body
        const user = await User.findOne({uname:uname}).exec()
        if(user.password === password){
            res.redirect(303, "/fab/shop")
        }
    }catch(err){
        console.log(err.message)
    }
}