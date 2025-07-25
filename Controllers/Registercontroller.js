const User = require('../models/Registarmodel');
const bcrypt = require('bcryptjs');

exports.registerUser = async(req,res) => {
    try{
        const {username,email,password } = req.body;

        const exitingUser = await User.findOne({ $or:[{email},{username}]})
        if (exitingUser){
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });

        await newUser.save();
        res.status(201).json({massage:'User registered success'})
        } catch(error){
            console.error(error);
            res.status(500).json ({massage:'server error'})
        }
    };
