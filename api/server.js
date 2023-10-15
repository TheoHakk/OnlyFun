const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = 3001;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});


app.get('/GetVideoGame', (req, res) => {
    res.send('Hello World!');
});


app.post('/PostNewCommentary', (req, res) => {
    console.log(req.body);
});
