const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "mo76492250",
  database: "likeme",
  port: 5432,
  allowExitOnIdle: true,
});

// Obtener posts
const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    console.log("getPost", result.rows);
    return result.rows;
  } catch (error) {
    res.status(500).send("Error al obtener los posts");
  }
};

// Añadir posts
const addPost = async ({ titulo, img, descripcion }) => {
  try {
    const consulta =
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [titulo, img, descripcion, 0];
    const result = await pool.query(consulta, values);
    console.log("addPost", result.rows);
    return result.rows;
  } catch (error) {
    res.status(500).send("Error al añadir el post");
  }
};

// Modificar posts
const addLikePost = async (id) => {
  try {
    const consulta =
      "UPDATE posts SET like = like + 1 WHERE id = $1 RETURNING *";
    const values = [id];
    console.log("id dele-->", id);
    const result = await pool.query(consulta, values);
    console.log("addLik", result.rows);
    return result.rows;
  } catch (error) {
    res.status(500).send("Error al modificar el post");
  }
};

// Borrar posts
const deletePost = async (id) => {
  try {
    const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(consulta, values);
    console.log("id dele-->", id);
    return result.rows;
  } catch (error) {
    res.status(500).send("Error al eliminar el post");
  }
};

module.exports = { getPosts, addPost, addLikePost, deletePost };
