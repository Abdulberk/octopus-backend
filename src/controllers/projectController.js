const { MongoClient, ServerApiVersion } = require('mongodb');
const verifyToken = require("../utils/verifyToken");
const asyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');

const getProjects = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    console.log(userId);
    if (!userId) {
        return res.status(400).json({ message: 'Lütfen giriş yapınız!' });
    }

    const mongoURI = process.env.MONGODB_URI;
    const client = new MongoClient(mongoURI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('octopus');
        const projectsCollection = db.collection('users');

         const user = await projectsCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı!' });
        }

        const projects = user.projects || [];

        return res.status(200).json({ projects });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Sunucu hatası!' });
    } finally {
        await client.close();
    }
});

module.exports = getProjects;
