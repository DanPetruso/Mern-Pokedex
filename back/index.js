const express = require("express");
const app = express();
const PokemonModel = require("./models/Pokemon");
const {MongoClient} = require("mongodb")

const cors = require("cors");

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://danswift:pikachu@cluster0.n5pqqwu.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);

var data = [];

async function main() {

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        data = await getPokemon(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }

}

main().catch(console.error);

app.get("/getPokemon", async(req, res) => {
    try {
        res.json(data);
    } catch (error) {
        res.send(error)
    }
})



async function getPokemon(client){

    var db = await client.db("Pokemon");
    var collection = await db.collection("pokeData");

    var data = await collection.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(result));
        }
    })
 
    return data



};





app.listen(3001, () => {
  console.log("SERVER UP");
});