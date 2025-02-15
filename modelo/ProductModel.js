import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export const testDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    console.log("✅ Conexión exitosa a la base de datos");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error.message);
    return false;
  }
};


const ProductModel = {
  async addProduct(nombre, precio) {
    try {
      const sql = "INSERT INTO producto (nombre, precio) VALUES (?, ?)";
      const [result] = await pool.execute(sql, [nombre, precio]);
      return result;
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
      throw error;
    }
  },

  async listProducts() {
    try {
      const [rows] = await pool.execute("SELECT * FROM producto");
      return rows;
    } catch (error) {
      console.error("❌ Error al listar productos:", error);
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      const [result] = await pool.execute("DELETE FROM producto WHERE id = ?", [id]);
      return result.affectedRows;
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      throw error;
    }
  },
};

export default ProductModel;
