import express from "express";
import cors from "cors";
import "dotenv/config";

import { likeModel } from "./models/likeModel.js";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(index);
});

// GET posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await likeModel.findAll();
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /todos/:id
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await likeModel.findById(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST posts
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  if (!titulo || !img || !descripcion) {
    return res
      .status(400)
      .json({ message: "titulo, img o descipcion is required" });
  }
  const newPost = {
    titulo,
    img,
    descripcion,
  };
  try {
    const post = await likeModel.create(newPost);
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// PUT posts
app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await likeModel.update(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE posts
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const post = await likeModel.remove(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, ()=>{
  console.log(`Servidor encendido en http://localhost:${PORT} `)
});
