import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const users = [];

const tweets = [];
const logout = []

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

app.post(`/tweets`, (req, res) => {
    const { user} = req.headers
    const { tweet } = req.body

    if (!user){
        res.status(400).send({ error: "UNAUTHORIZED" })
    }
    if (!tweets){
        res.status(400).send({ error: "UNAUTHORIZED" })
    }
    const userExist = users.find((u) => u.username === user)

    if (!userExist){
        res.status(401).send("UNAUTHORIZED")
    }

    tweets.push({ username: user, tweet })

    res.status(201).send({ message: "OK" })

})

app.get(`/tweets`, (req, res) => {
    tweets.forEach((tweet) => {
        const {avatar} = users.find((u) => u.username === tweet.username);
        tweet.avatar = avatar
    })

    res.send(tweets.slice(-10).reverse())
})
app.listen(5000, () => console.log('listening on port 5000'));

