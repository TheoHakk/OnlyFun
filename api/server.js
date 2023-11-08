const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

app.use(express.json());
app.use(cors());
let db = new sqlite3.Database('./db/onlyfunDatabase.db');

const port = 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/VideoGame', (req, res) => {
    const sqlQuery = `SELECT * FROM VideoGame WHERE ID = (?)`;
    const id = req.query.id;

    db.all(sqlQuery, id, (err, rows) => {
        //Check if the rows are empty
        if (rows.length === 0)
            res.sendStatus(404);
        else
            res.json(rows);
    });
});

app.post('/Verify', (req, res) => {
    const sqlQuery = 'SELECT * FROM Tokens WHERE Token = (?)'
    const token = req.body.token;
    db.all(sqlQuery, token, (err, rows) => {
        if (rows.length === 0)
            res.sendStatus(404);
        else
            res.sendStatus(200);
    })
});

app.get('/AllVideoGames', (req, res) => {
    db.all(`SELECT ID, Name, Description, ImageLink FROM VideoGame`, (err, rows) => {
        //console.log(rows);
        res.json(rows);
    });
});

app.get('/Commentaries', (req, res) => {
    const sqlQuery = `SELECT * FROM Commentaries WHERE VideoGameID = (?)`;
    const id = req.query.id;

    db.all(sqlQuery, id, (err, rows) => {
        res.json(rows);
    });
});

app.post('/NewCommentary', (req, res) => {
    const SqlQuery =
        "INSERT INTO Commentaries (VideoGameID, Name, Date, Commentary, PictureSource) VALUES (?, ?, ?, ?, ?)";
    const {id, Name, Date, Commentary, PictureSource} = req.body;

    db.run(SqlQuery, [id, Name, Date, Commentary, PictureSource], (err) => {
        if (err)
            console.log(err);
        else
            console.log("Commentaire ajouté")
        res.send({result: "ok"})
    });
});

function storeToken(token, userId) {
    const SqlQuery =
        "INSERT INTO Tokens (Token, UserID) VALUES (?, ?)";
    db.run(SqlQuery, [token, userId], (err) => {
        if (err)
            console.log(err);
        else
            console.log("Token ajouté")
    });
}

app.post('/Login', (req, res) => {
    console.log("body :" + req.body);
    let token = req.body;

    const SqlQuery =
        "SELECT * FROM USERS WHERE Username = (?) AND Password = (?)";
    let userId;

    db.all(SqlQuery, [token.username, token.password], (err, rows) => {
        if (err)
            console.log(err);
        else {
            if (rows.length === 0)
                res.sendStatus(404);
            else {
                rows.map((row) => {
                    //I know we will have only one line because of the username and password
                    userId = row.Id;
                    console.log("userId : " + userId);
                    require('crypto').randomBytes(48, function (err, buffer) {
                        token = buffer.toString('hex');
                        storeToken(token, userId);
                        res.send({token: token});
                    });
                });
            }
            res.sendStatus(200);
        }
    });
});

app.post('/NewUser', (req, res) => {
    const token = req.body;
    console.log("token user; " + token.username);
    console.log("token pwd ; " + token.password);
    const SqlQuery =
        "INSERT INTO USERS (Username, Password) VALUES (?, ?);"
    const username = token.username;
    const password = token.password;

    db.run(SqlQuery, [username, password], (err) => {
        if (err)
            console.log(err);
        else
            console.log("User ajouté")
        res.send({result: "ok"})
    });
});

app.delete('/EraseCommentary', (req, res) => {
    const sqlQuery = `DELETE FROM Commentaries WHERE ID = (?)`;
    const id = req.query.id;

    db.run(sqlQuery, id, (err) => {
        if (err)
            console.log(err);
        else
            console.log("Commentaire supprimé")
        res.send({result: "ok"})
    });
});


app.post('/NewVideoGame', (req, res) => {
    const SqlQuery =
        "INSERT INTO VideoGame (Name, ImageLink, Description, Genre, ReleaseDate, Developper, Publisher, VideoLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const {Name, ImageLink, Description, Genre, ReleaseDate, Developper, Publisher, VideoLink} = req.body;

    db.run(SqlQuery, [Name, ImageLink, Description, Genre, ReleaseDate, Developper, Publisher, VideoLink], (err) => {
        if (err) {
            console.log(req.body)
            console.log(err);
        } else
            console.log("Jeu ajouté")
    });
});

