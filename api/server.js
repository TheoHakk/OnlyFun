const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcrypt")
const crypto = require('crypto')

const MINUTES = 15;
const expiration = MINUTES * 60 * 1000;

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
        if (rows.length === 0)
            res.sendStatus(404);
        else
            res.json(rows);
    });
});

app.post('/Verify', (req, res) => {
    const sqlQuery = 'SELECT * FROM Tokens WHERE Token = (?)';
    const sqlQuery2 = 'SELECT * FROM Users WHERE Id = (SELECT UserID FROM Tokens WHERE Token = (?))';
    const token = req.body.token;
    db.all(sqlQuery, token, (err, rows) => {
        if (rows.length === 0)
            res.sendStatus(404);
        else
            rows.map((row) => {
                if ((row.Creation + expiration) < (new Date()).getTime()) {
                    eraseToken(row.Id);
                    res.sendStatus(404);
                }else{
                    db.all(sqlQuery2, token, (err, rows) => {
                        if (rows.length === 0)
                            res.sendStatus(404);
                        else
                            res.json(rows);
                    });
                }
            });
    });
})

function eraseToken(id){
    const sqlQuery = `DELETE FROM Tokens WHERE ID = (?)`;
    db.run(sqlQuery, id, (err) => {
        if (err)
            console.log(err);
        else
            console.log("Token supprimé")
    });
}

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
        "INSERT INTO Tokens (Token, UserID, Creation) VALUES (?, ?, ?)";
    db.run(SqlQuery, [token, userId, (new Date()).getTime()], (err) => {
        if (err)
            console.log(err);
        else
            console.log("Token ajouté")
    });
}

app.post('/Login', (req, res) => {
    let credential = req.body;

    const SqlQuery =
        "SELECT Password, Id FROM Users WHERE Username = (?)"

    db.all(SqlQuery, credential.username, (err, rows) => {
        if (err) {
            console.log(err);
        } else if (rows.length === 0) {
            console.log("user not found")
            res.sendStatus(404);
        } else {
            rows.map((row) => {
                console.log(row)
                comparePassword(credential.password, row.Password).then((result) => {
                    if (result) {
                        console.log("user found & password match")
                        crypto.randomBytes(48, function (err, buffer) {
                            credential = buffer.toString('hex');
                            storeToken(credential, row.Id);
                            res.status(200).send({token: credential}); // Envoyez une réponse 200 avec le jeton
                        });
                    } else {
                        res.sendStatus(404);
                    }
                })
            });
        }
    });
});

async function comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
}


app.post('/NewUser', (req, res) => {
    const token = req.body;

    const SqlQuery =
        "INSERT INTO USERS (Username, Password) VALUES (?, ?);"
    const SqlQueryVerification =
        "SELECT * FROM USERS WHERE Username = (?);"

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(token.password, salt, function (err, hash) {
            db.all(SqlQueryVerification, token.username, (err, rows) => {
                if (err)
                    console.log(err)
                else {
                    console.log(rows)
                    if (rows.length !== 0) {
                        console.log("user already exists")
                        res.sendStatus(404);
                    } else {
                        db.run(SqlQuery, [token.username, hash], (err) => {
                            if (err)
                                console.log(err);
                            else
                                console.log("User ajouté")
                            res.send({result: "ok"})
                        });
                    }
                }
            });
        });
    })


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

