const express = require('express')
const router = express.Router()
const user = require('../models/users')

const jwt = require('jsonwebtoken')
const jwt_key = process.env.JWT_KEY
const jwtAuthMiddleware = require('../middleware/jwt')

const bcrypt = require('bcrypt')

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



router.post('/signup',async(req,res)=>{

    const {name, email, age, mobile, password} = req.body

    const defaultAvatar = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(name)}`;

    try{
        const ifexist = await user.ifExist(name,email)
        if(ifexist){
            return res.status(400).json({message: 'user already exist'})
        }
        const hashpassword = await bcrypt.hash(password,10)
        const person = await user.createUser(name,email,age,mobile,hashpassword,defaultAvatar)

        //token creation
        const token = jwt.sign(
            {id: person.id, name: person.name, email: person.email},
            jwt_key,
            {expiresIn:"7d"}
        )

        res.status(200).json({message: 'user Registered Successfully 🎉',token})

    }catch(err){
        console.error(err)
        res.status(500).send('databse error')
    }
})

router.post('/signin', async(req,res)=>{

    const {identifier, password} = req.body
    
    try{
        const person = await user.identify(identifier)
        if(!person){
            return res.status(401).json({message: 'Username or Email is incorrect'})
        }

        const matchpassword = await bcrypt.compare(password, person.password)
        if(!matchpassword){
            return res.status(401).json({message: 'Incorrect password'})
        }

        //token creation
        const token = jwt.sign(
            {id: person.id, name: person.name, email: person.email},
            jwt_key,
            {expiresIn:"7d"}
        )

        res.status(200).json({message: 'Login successfully 😊', token})
                                                                            
    }catch(err){
        console.error(err)
        res.status(500).send('databse error')
    }
})

router.get('/profile', jwtAuthMiddleware, async (req,res)=>{
    try{
  
      const userdata = req.user;
      const userid = userdata.id;
      const person = await user.findById(userid);
      //console.log("User fetched by ID:", person);
      res.status(200).json({person});
  
  
    }catch(err){
      console.error(err);
      res.status(500).send('database error');
    }
})

router.get('/profileimage',jwtAuthMiddleware,async(req,res)=>{
    const userdata = req.user
    const userid = userdata.id

    const person = await user.findById(userid)
    res.status(200).json(person)
})

router.post('/ask', jwtAuthMiddleware, async (req,res)=>{
    try{
        const userinput = req.body.message
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userinput,
        })
        res.status(200).json({reply: result.text})
    }catch(err){
        res.status(500).json({error: "something went wrong"})
    }
})

module.exports = router
