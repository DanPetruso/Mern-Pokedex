const mongoose = require("mongoose");

var PokemonSchema = new mongoose.Schema({
    "type": "object",
    "properties": {
      "_id": {
        "type": "object",
        "properties": {
          "$oid": {
            "type": "string"
          }
        },
        "required": [
          "$oid"
        ]
      },
      "National_No": {
        "type": "number"
      },
      "Name": {
        "type": "string"
      },
      "Type_1": {
        "type": "string"
      },
      "Type_2": {
        "type": "string"
      },
      "Abilities": {
        "type": "string"
      },
      "Local_No": {
        "type": "string"
      },
      "HP": {
        "type": "number"
      },
      "Attack": {
        "type": "number"
      },
      "Defense": {
        "type": "number"
      },
      "Sp Atk": {
        "type": "number"
      },
      "Sp Def": {
        "type": "number"
      },
      "Speed": {
        "type": "number"
      },
      "Total": {
        "type": "number"
      }
    },
    "required": [
      "_id",
      "National_No",
      "Name",
      "Type_1",
      "Type_2",
      "Abilities",
      "Local_No",
      "HP",
      "Attack",
      "Defense",
      "Sp Atk",
      "Sp Def",
      "Speed",
      "Total"
    ]
  });

 
var PokemonModel = mongoose.model("Pokemon", PokemonSchema, "pokeData");

module.exports = PokemonModel;

