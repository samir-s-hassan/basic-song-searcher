//Samir Hassan -->

// Import necessary modules
const express = require("express");
const path = require("path");
const fs = require("fs");

// Create an instance of the express application
const app = express();

// Set a constant port
const port = 3000;

// Define the Song class
class Song {
  constructor(title, artist, numone) {
    this.title = title;
    this.artist = artist;
    this.numone = numone;
  }
}

// Define the path to the public folder and serve it statically
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Read in the data from the CSV file and convert it into Song objects
let data = fs.readFileSync("top40.csv", "utf8");
let lines = data.split("\r\n");
let songs = lines.slice(1).map((line) => {
  let songfields = line.split(",");
  songfields = songfields.map((songfield) => songfield.replace(/^'+|'+$/g, ""));
  let artist = songfields[1];
  let title = songfields[2];
  let numone = songfields[3] === "1" ? true : false;
  return new Song(title, artist, numone);
});

// Define a route to handle search requests
app.get("/search", function (req, res) {
  let artistKeyword = req.query.artist ? req.query.artist.toLowerCase() : "";
  let titleKeyword = req.query.title ? req.query.title.toLowerCase() : "";
  let filteredSongs = songs.filter((song) => {
    let lowerArtist = song.artist.toLowerCase();
    let lowerTitle = song.title.toLowerCase();
    return (
      (lowerArtist.includes(artistKeyword) || artistKeyword === "") &&
      (lowerTitle.includes(titleKeyword) || titleKeyword === "")
    );
  });
  res.send(JSON.stringify(filteredSongs));
});

// Define a catch-all route for invalid requests
app.use(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Invalid Request.");
});

// launch the server
app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`); //this helps load the website right from terminal
});
