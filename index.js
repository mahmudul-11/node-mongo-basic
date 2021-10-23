const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
//user: user1996
//password : t6Kc0LI0uMBBVdZ2



const uri = "mongodb+srv://user1996:t6Kc0LI0uMBBVdZ2@cluster0.gbhkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("FoodRestaurant");
        const usersCollection = database.collection("users");
        // create a document to insert
        const doc = {
            name: "Hasim ",
            email: "hasim@gmial.com"
        }
        const result = await usersCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        console.log(result)
    } finally {
        await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Welcome Home");
})



app.listen(port, () => {
    console.log('Listing form port', port);
})