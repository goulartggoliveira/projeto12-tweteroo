import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const users = [];

const tweets = [];


app.post(`/sign-up`, (req, res) => {

    const { username, avatar } = req.body

    if (!username || !avatar) {
        res.status(400).send(`Invalid username`);
    }

    const isUserExist = users.find((us) => us.username === username)

    if (isUserExist) {
        res.status(409).send("User already exists")
    }

    users.push({ username, avatar})

    res.status(201).send("OK")
})

app.get(`/sign-up`, (req, res) => {
    res.send(users)
})



app.listen(5000, () => console.log('listening on port 5000'));

