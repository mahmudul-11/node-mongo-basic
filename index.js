const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
//user: user1996
//password : t6Kc0LI0uMBBVdZ2

// middleWare 
app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://user1996:t6Kc0LI0uMBBVdZ2@cluster0.gbhkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("FoodRestaurant");
        const usersCollection = database.collection("users");

        //Get API
        app.get('/users', async (req, res) => {
            const pointer = usersCollection.find({});
            const users = await pointer.toArray();
            res.send(users)

        });
        // Get dynamic Api 
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usersCollection.findOne(query);
            console.log('Load user with id =', id);
            res.json(user);
        })

        //POST API
        app.post('/users', async (req, res) => {
            const doc = req.body;
            const result = await usersCollection.insertOne(doc);
            res.json(result);
            console.log(result);


        });
        //Delete API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log(result);
            res.json(result);
        });





        // // create a document to insert
        // const doc = {
        //     name: "Hasim ",
        //     email: "hasim@gmial.com"
        // }
        // const result = await usersCollection.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        // // console.log(result)



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


//start
app.get('/', (req, res) => {
    res.send("Welcome Home");
})



app.listen(port, () => {
    console.log('Listing form port', port);
})