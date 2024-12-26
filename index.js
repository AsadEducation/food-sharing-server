const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

        //creating requested food collection in food database;

        const requestedFoodCollection = foodDB.collection('Requested-Food-Collection');

        //showing featured foods from food collection.

        app.get('/featured-food', async (req, res) => {

            const cursor = foodCollection.find();

            const result = await cursor.skip(1).limit(6).sort({ food_quantity: -1 }).toArray(); // skipping the first element because it is null in client ui

            res.send(result);

        })

        //showing all available foods 

        app.get('/available-foods', async (req, res) => {
            // finding document which food_status field is "available"

            const available = "available".toLowerCase();

            const cursor = foodCollection.find({ food_status: available }).sort({ expired_datetime: 1 });

            // skipping the first element because it is null in client ui

            const result = await cursor.toArray();

            res.send(result);
        })

        //api for single food details based on id

        app.get('/food-details/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) };

            const result = await foodCollection.findOne(query);
            // console.log(result);
            res.send(result);
        })

        //api for showing a specific users added food

        app.get('/added-food', async (req, res) => {


            const email = req.query.email;

            if (!email) {
                res.send({ message: 'Please Provide An Email First' })
            }

            // console.log(email);

            const query = { food_donator_email: email };

            const result = await foodCollection.find(query).toArray();

            res.send(result);
        })


        //api for adding new foods from form 

        app.post('/add-food', async (req, res) => {
            // console.log(req.body)

            const addedFood = req.body;

            const result = await foodCollection.insertOne(addedFood);

            res.send(result);

        })

        //api for updating additional notes in food details

        app.put('/food-details/:id', async (req, res) => {

            const id = req.params.id;

            const inputValue = req.body.value;

            // console.log(inputValue);

            const filter = { _id: new ObjectId(id) };

            const options = { upsert: true };

            const updateDoc = {
                $set: {
                    additional_notes: inputValue,
                },
            };

            const result = await foodCollection.updateOne(filter, updateDoc, options)

            res.send(result);


        })

        //api for updating added food by a specific user

        app.put(`/add-food/:id`, async (req, res) => {

            const id = req.params.id;
            const updatedFood = req.body;

            const filter = { _id: new ObjectId(id) };

            const options = { upsert: true };

            const updateDoc = {

                $set: updatedFood
            }

            const result = await foodCollection.updateOne(filter, updateDoc,options);

            res.send(result);

        })

        //api for deleting the requested food from foodCollection

        app.delete('/available-foods/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: new ObjectId(id) }
            const result = await foodCollection.deleteOne(query);

            res.send(result);

        })

        //api for deleting added food from manage my foods

        app.delete('/my-added-food/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            const result = await foodCollection.deleteOne(query);
            res.send(result);
        })

        // requested food collection api 

        //api for getting all food request for logged in user

        app.get('/requested-food/:email', async (req, res) => {

            const email = req.params.email;

            if (!email) {

                res.send({ message: 'Please Provide an Email First' })
            }

            const query = { food_requestor_email: email }

            const result = await requestedFoodCollection.find(query).toArray();

            res.send(result);

        })


        //api for adding a single requested food in the requested food collection

        app.post('/requested-food', async (req, res) => {
            const requestedFood = req.body;

            // console.log(requestedFood);

            const result = await requestedFoodCollection.insertOne(requestedFood);

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