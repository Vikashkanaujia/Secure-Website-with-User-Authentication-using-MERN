const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const User = require('./models/userSchema')
const SECRET_KEY='secretkey'
//connect to express app
const app = express()

// conect mongodb 

mongoose.connect('mongodb://localhost:27017/user-authenticaton')
    .then(() => {
        app.listen(5000, () => {
            console.log("server and mongodb is connected ");
        })
    })
    .catch((err) => {
        console.log('Unable to connect to server and/or mongodb');
    })

//middleware

app.use(cors());
app.use(express.json())

//Routes

//USER REGISTRATION

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json({ message: "User created successfully" })
    }
    catch(error) {
        res.status(500).json({error : 'Error siging up'})
    }
});

//GET REGISTERD USER
app.get('/register', async (req,res)=>{
       try{
        const users = await User.find({})
        res.status(201).json(users)
       }
       catch(error){
        res.status(500).json({error : 'Unable to get users'})

       }
})

//LOGIN

app.post('/login',async (req,res)=>{
    try{
            const { email ,password} = req.body
            const user = await User.findOne({email})

            if(!user){
                return res.status(401).json({error : 'Invalid credential;'})
            }
            const isPasswordValid = await bcrypt.compare(password,user.password)

            if(!isPasswordValid){
                return res.status(401).json({error : 'Invalid credential;'})
            }

            const token = jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'1hr'})
            res.json({message:'Login successful' ,user:token})
    }
    catch(err){
        res.status(500).json({error: 'Error logging in'})

    }
})

