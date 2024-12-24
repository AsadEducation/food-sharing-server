const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ueh5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //created food collection and food database 

        const foodDB = client.db('FoodDB');
        const foodCollection = foodDB.collection('Food-Collection');

        //showing featured foods from food collection.

        app.get('/featured-food', async (req, res) => {

            const cursor = foodCollection.find();

            const result = await cursor.skip(1).limit(6).sort({food_quantity:-1}).toArray(); // skipping the first element because it is null in client ui
        
            res.send(result);

        })

       

    } finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello Server ')
})

app.listen(port, () => {
    console.log(`server is running properly at : ${port}`);
})