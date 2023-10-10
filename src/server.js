const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const projectsRoutes = require('./routes/projectsRoutes');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = process.env.MONGODB_URI;
/* const jsonPath = path.join(__dirname, 'users.json');
const projectsPath = path.join(__dirname, 'projects.json'); */

/* const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); */


app.use('/auth', authRoutes);
app.use('/', projectsRoutes);

app.get('*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});
/* async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db('octopus');
    const usersCollection = db.collection('users');

    const usersData = fs.readFileSync(jsonPath, 'utf-8');
    const projectsData = fs.readFileSync(projectsPath, 'utf-8');

    const usersJsonData = JSON.parse(usersData).users;
    const projectsJsonData = JSON.parse(projectsData).products;

    const projectsArray = projectsJsonData.map(project => {
      return {
        id: project.id,
        title: project.title,
        description: project.description,
        price: project.price,
        brand: project.brand,
        category: project.category,
        thumbnail: project.thumbnail,
        images: project.images
      };
    });

   
    const allProjects = [...projectsArray];
  
    const shuffledProjects = allProjects.sort(() => 0.5 - Math.random());

    const usersArray = usersJsonData.map(user => {
     
      const randomProjects = shuffledProjects.slice(0,  Math.floor(Math.random() * 10) + 1);
      return {
        id: user.id,
        username: user.username,
        pass: user.password,
        name: user.name,
        email: user.email,
        image: user.image,
        projects: randomProjects,
        authors: []
      };
    });

    await usersCollection.insertMany(usersArray);

    console.log('Data inserted successfully');

    client.close();
  } catch (err) {
    console.error('Error inserting data:', err);
    client.close();
  }
}
 */
// run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
