require("dotenv").config();
​
var keys = require("./keys.js");
​
var Spotify = require("node-spotify-api");
​
var bandsintown = keys.bandsintown.app_id;
var omdbiapi = keys.omdbiapi.app_key;
​
var spotify = new Spotify(keys.spotify);
​
var axios = require("axios");
​
var moment = require("moment");
​
//inputs 
var user = process.argv[2];
var user1 = process.argv[3];
​
function userInput(user, user1) {
    switch (user) {
        case "spotify-this-song":
            song(user1);
            break;
        case "concert-this":
            concert(user1);
            break;
        case "movie-this":
            movie(user1);
            break;
        default:
            console.log("Input one of the following functions with a paramter:");
​
    }
}
userInput(user, user1);
​
//spotify this track
function song(user1) {
​
    spotify.search({ type: 'track', query: user1, limit: 1 }, function (err, data) {
        if (err) {
            // The request was made and the server responded with a status code
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            var songData = data.tracks.items[i];
            //printing data
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song Title: " + songData.name);
            console.log("Album: " + songData.album.name);
            console.log("Preview Track: " + songData.preview_url);
​
        }
        // console.log(data); 
    });
}
​
//info about bands in town
​
function concert(user1) {
    axios.get("https://rest.bandsintown.com/artists/" + user1 + "/events?app_id=" + bandsintown).then(
        function (response) {
            //printing data
            console.log("Artis is: " + response.data[0].lineup[0]);
            console.log("Concert name is: " + response.data[0].venue.name);
            console.log("City is: " + response.data[0].venue.city);
            console.log("Country is: " + response.data[0].venue.country);
            //format to moment
            console.log("Data and Time is: " + moment(response.data[0].datetime).format('MMMM Do YYYY, h:mm a'));
​
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
​
}
​
​
//get movie info
​
function movie(user1) {
    var dataArr = user1.split(" ").join("+");
    if (!dataArr) {
        dataArr = "mr nobody"
​
        axios.get("http://www.omdbapi.com/?t=" + dataArr + "&y=&plot=short&apikey=" + omdbiapi).then(
            function (response) {
                console.log("The movie's title is: " + response.data.Title);
            })
    };
    axios.get("http://www.omdbapi.com/?t=" + dataArr + "&y=&plot=short&apikey=" + omdbiapi).then(
        function (response) {
            //printing data
            console.log("The movie's title is: " + response.data.Title);
            console.log("The movie's releases is: " + response.data.Released);
            console.log("The movie's actors is: " + response.data.Actors);
            console.log("The movie's rating is: " + response.data.imdbRating);
            console.log("The movie's plot is: " + response.data.Plot);
            console.log("The movie's country is: " + response.data.Country);
​
​
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
​
}