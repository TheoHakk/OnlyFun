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

app.get('/GetVideoGame', (req, res) => {
    console.log(req.query.id);
    const sqlQuery = `SELECT * FROM VideoGame WHERE ID = (?)`;

    db.all(sqlQuery, req.query.id, (err, rows) => {
        res.json(rows);
        if(err)
            console.log(err);
        else
            console.log(rows);
    });
});

app.get('/GetAllVideoGames', (req, res) => {
    db.all(`SELECT ID, Name, Description, ImageLink FROM VideoGame`, (err, rows) => {
        console.log(rows);

        res.json(rows);
    });
});

app.get('/GetCommentaries', (req, res) => {
    db.all(`SELECT Name, Date, Commentary, PictureSource FROM Commentaries WHERE VideoGame`, (err, rows) => {
        if(err)
            console.log(err);
        else
            console.log(rows);
        res.json(rows);
    });
});

app.post('/PostNewCommentary', (req, res) => {
    const SqlQuery =
        "INSERT INTO Commentaries (VideoGameID, Name, Date, Commentary, PictureSource) VALUES (?, ?, ?, ?, ?)";
    const { id, name, date, commentary, source } = req.body;

    db.run(SqlQuery, [id, name, date, commentary, source], (err) => {
        if(err)
            console.log(err);
        else
            console.log("Commentaire ajouté")
    });

});

