const express = require("express");
const cors = require("cors");
const path = require("path");

const {
  getPosts,
  addPost,
  addLikePost,
  deletePost,
} = require("./controller/pg");

const index = path.join(__dirname, "../frontend/index.html");

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(index);
});

app.get("/posts", async (req, res) => {
  const result = await getPosts()
    .then((result) => {
      res.status(result?.code ? 500 : 200).json(result);
      console.log("appget");
    })
    .catch((error) => res.status(500).json(error));
});

app.post("/posts", async (req, res) => {
  const result = await addPost(req.body)
    .then((result) => {
      res.status(result?.code ? 500 : 200).json(result);
      console.log("apppost ");
    })
    .catch((error) => res.status(500).json(error));
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  const result = await addLikePost(id)
    .then((result) => {
      res.status(result?.code ? 500 : 200).json(result);
      console.log("applik");
    })
    .catch((error) => res.status(500).json(error));
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id appdel --> ", id);
  const result = await deletePost(id)
    .then((result) => {
      res.status(result?.code ? 500 : 200).json(result);
      console.log("appdel");
    })
    .catch((error) => res.status(500).json(error));
});

app.listen(
  PORT,
  console.log(`Servidor encendido en http://localhost:${PORT} `)
);
