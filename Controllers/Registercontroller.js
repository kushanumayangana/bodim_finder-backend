const User = require('../models/Registarmodel');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

exports.registerUser = async(req,res) => {
    try{
        const {username,email,password } = req.body;

        const exitingUser = await User.findOne({ $or:[{email},{username}]})
        if (exitingUser){
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() +5*60*1000;

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            otp,
            otpExpires,
            isVerified:false,
        });

        await newUser.save();
        
        await sendEmail(
                        email,
                        'OTP Verification',
  `                     Hello ${username},\n\nYour OTP is: ${otp}\nIt expires in 5 minutes.\n\nThank you!`
                        );


        
        res.status(201).json({message:'User registered success'})
        } catch(error){
            console.error(error);
            res.status(500).json ({message:'server error'})
        }
    };

    exports.verifyOtp = async(req,res) =>{
        try{
            const{email,otp} = req.body;
            const user = await User.findOne({email});

            if (!user) return res.status(400).json({message:'user not found'});
            if(user.isVerified) return res.status(400).json({message:'user  success'});
            if(user.otp !==otp|| Date.now() > user.otpExpires){
                return res.status(400).json({message:'invalied or expierd OTP'});
            }
            user.isVerified=true;
            user.otp = undefined;
            user.otpExpires = undefined;

            await user.save();
            res.status(200).json({message:'user verified successfully!'})
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'server error'})
        }
    };
