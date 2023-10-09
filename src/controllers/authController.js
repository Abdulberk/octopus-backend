const verifyToken = require("../utils/verifyToken");
const express = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const { MongoClient, ServerApiVersion } = require('mongodb');



const checkPasswordFunc = async(password, userPassword) => {

    if (!password || !userPassword) {
        return false;
    }

    return await password === userPassword;

}


const login = asyncHandler(async (req, res) => {

    try {
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'email ve şifre giriniz'});
        }

        const mongoURI = process.env.MONGODB_URI;
        const client = new MongoClient(mongoURI, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('octopus');
        const usersCollection = db.collection('users');

        
        const getUser = usersCollection.findOne({email: email});
        const user = await getUser;
        if (!user) {
            return res.status(400).json({message: 'kullanıcı bulunamadı'});
        }

        const checkPassword = await checkPasswordFunc(password, user.pass);
        if (!checkPassword) {
            return res.status(400).json({message: 'şifre yanlış'});
        }

        
    
        const newToken = await generateToken(user);
    
    
        return res.status(200).json({
            message: 'giriş başarılı',
            token :  newToken
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'sunucuda bir hata oluştu, giriş yapılamadı'});
        
    }



});

module.exports = login;
