import { pool } from "../database/connection.js";

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const findById = async (id) => {
  const query = "SELECT * FROM posts WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const create = async ({ titulo, img, descripcion }) => {
  const consulta =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [titulo, img, descripcion, 0];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

const remove = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const update = async (id) => {
    const query = "UPDATE posts SET likes = COALESCE(likes,0) + 1 WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
    };

export const likeModel = {
  findAll,
  findById,
  create,
  remove,
  update,
};
