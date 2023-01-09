import express from "express";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send({ error: "Todos os campos são obrigatórios!" });
    return;
  }

  const userExist = users.find((user) => user.username === username);

  if (userExist) {
    res.status(409).send({ error: "Usuário já existe!" });
  }

  users.push({ username, avatar });

  res.send("OK!");
});

server.post("/tweets", (req, res) => {
  const { user } = req.headers;
  const { tweet } = req.body;

  if (!user) {
    res.sendStatus(401);
    return;
  }
  if (!tweet) {
    res.status(400).send({ error: "Envie um tweet!" });
    return;
  }

  tweets.push({ username: user, tweet });

  res.status(201).send({ message: "OK!" });
});

server.get("/tweets", (req, res) => {
  tweets.forEach((tweet) => {
    const { avatar } = users.find((user) => user.username === tweet.username);
    tweet.avatar = avatar;
  });

  const newTweets = [...tweets];

  res.send(newTweets.slice(-10).reverse());

  //   res.send(tweets);
});

server.listen(5000, () => console.log("Servidor funcionando na porta: 5000"));
