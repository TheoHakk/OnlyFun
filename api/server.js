const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require ('sqlite3').verbose();

app.use(express.json());
app.use(cors());
let db = new sqlite3.Database('./db/onlyfunDatabase.db');

const port = 3001;


let videoGame = {
    name: "Satisfactory",
    source: "https://images4.alphacoders.com/108/1083979.jpg",
    description: "Satisfactory is a first-person open-world factory building game with a dash of exploration and combat. Pioneering for FICSIT Incorporated means charting and exploiting an alien planet, battling alien lifeforms, creating multi-story factories, entering conveyor belt heaven, automating vehicles, and researching new technologies.",
    informations: {
        genre: "Adventure, Indie, Simulation",
        releaseDate: "19 Mar, 2019",
        developer: "Coffee Stain Studios",
        publisher: "Coffee Stain Publishing"
    },
    video: "https://www.youtube.com/embed/8PGepeXVkG4?si=KgswNEI6TM5Ha4qe",
    commentaries : [
        {
            name: "John Doe",
            date: "19/03/2019",
            commentary: "This game is awesome!",
            source: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        },
        {
            name: "Jane dane",
            date: "19/03/2019",
            commentary: "This game is holy boly!",
            source: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        }]
};

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});


app.get('/GetVideoGame', (req, res) => {
    console.log(req.query.id);
    db.all(`SELECT * FROM VideoGame WHERE ID = ${req.query.id}`, (err, rows) => {
        res.json(rows);
        if(err)
            console.log(err);
        else
            console.log(rows);
    });
});

app.get('/GetCommentaries', (req, res) => {
    db.all(`SELECT Name, Date, Commentary, PictureSource FROM Commentaries WHERE VideoGameID = ${req.query.id}`, (err, rows) => {
       res.json(rows);
        if(err)
            console.log(err);
        else
            console.log(rows);
    });
});

app.post('/PostNewCommentary', (req, res) => {

    videoGame.commentaries = [...videoGame.commentaries, req.body];

    console.log(videoGame.commentaries);
});

