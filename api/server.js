const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require ('sqlite3').verbose();

app.use(express.json());
app.use(cors());
let db = new sqlite3.Database('./db/onlyfunDatabase.db');

const port = 3001;

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});

app.get('/VideoGame', (req, res) => {
    const sqlQuery = `SELECT * FROM VideoGame WHERE ID = (?)`;
    const id = req.query.id;

    db.all(sqlQuery, id, (err, rows) => {
        //Check if the rows are empty
        if(rows.length === 0)
            res.sendStatus(404);
        else
            res.json(rows);
    });
});

app.get('/AllVideoGames', (req, res) => {
    db.all(`SELECT ID, Name, Description, ImageLink FROM VideoGame`, (err, rows) => {
        console.log(rows);
        res.json(rows);
    });
});

app.get('/Commentaries', (req, res) => {
    const sqlQuery = `SELECT * FROM Commentaries WHERE VideoGameID = (?)`;
    const id = req.query.id;

    db.all(sqlQuery, id,(err, rows) => {
        console.log(rows);
        res.json(rows);
    });
});

app.post('/NewCommentary', (req, res) => {
    const SqlQuery =
        "INSERT INTO Commentaries (VideoGameID, Name, Date, Commentary, PictureSource) VALUES (?, ?, ?, ?, ?)";
    const { id, Name, Date, Commentary, PictureSource } = req.body;

    db.run(SqlQuery, [id, Name, Date, Commentary, PictureSource], (err) => {
        if(err)
            console.log(err);
        else
            console.log("Commentaire ajouté")
        res.send({result: "ok"})
    });
});

app.delete('/EraseCommentary', (req, res) => {
    const sqlQuery = `DELETE FROM Commentaries WHERE ID = (?)`;
    const id = req.query.id;

    db.run(sqlQuery, id, (err) => {
        if(err)
            console.log(err);
        else
            console.log("Commentaire supprimé")
        res.send({result: "ok"})
    });
});


app.post('/NewVideoGame', (req, res) => {
    const SqlQuery =
        "INSERT INTO VideoGame (Name, ImageLink, Description, Genre, ReleaseDate, Developper, Publisher, VideoLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const { Name, ImageLink, Description, Genre, ReleaseDate, Developper, Publisher, VideoLink } = req.body;

    db.run(SqlQuery, [Name, ImageLink, Description, Genre, ReleaseDate, Developper, Publisher, VideoLink], (err) => {
        if(err){
            console.log(req.body)
            console.log(err);
        }else
            console.log("Jeu ajouté")
    });
});

