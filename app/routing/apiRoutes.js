var pokemons = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/pokemons", function(req,res){
        res.json(pokemons);
    });
    app.post("/api/pokemons", function(req,res){
        var bestMatch = {
        name: "",
        photo:"",
        pokemonDifference: 1000
        };

        console.log(req.body);

    var pokemonData = req.body;
    var pokemonScores = pokemonData.scores;

    console.log(pokemonScores);

    var totalDifference = 0;

    for (var i = 0; i < pokemons.length; i++) {
        console.log(pokemons[i]);
        totalDifference = 0;

        for (var j=0; j < pokemons[i].scores[j]; j++){
            totalDifference += Math.abs(parseInt(pokemonScores[j]) - parseInt(pokemons[i].scores[j]));
            if (totalDifference <= bestMatch.pokemonDifference){
                bestMatch.name = pokemons[i].name;
                bestMatch.photo = pokemons[i].photo;
                bestMatch.pokemonDifference = totalDifference;
            }
        }
    }
    pokemons.push(pokemonData);
    res.json(bestMatch);
    });
}