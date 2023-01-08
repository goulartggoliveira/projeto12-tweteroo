import express from "express";
import cors from "cors";

const server = express();

server.listen(5000, () => console.log("Servidor funcionando na porta: 5000"));
