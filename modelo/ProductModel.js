import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const db = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "datos",
});

export const testDBConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "productdb",
    });

    await connection.ping(); // Verifica que la conexión es válida
    console.log("✅ Conexión exitosa a la base de datos");
    await connection.end(); // Cierra la conexión temporal

    return true;
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error.message);
    return false;
  }
};

const ProductModel = {
  async addProduct(nombre, precio) {
    const sql = "INSERT INTO producto (nombre, precio) VALUES (?, ?)";
    await db.execute(sql, [nombre, precio]);
  },

  async listProducts() {
    const [rows] = await db.execute("SELECT * FROM producto");
    return rows;
  },

  async deleteProduct(id) {
    const [result] = await db.execute("DELETE FROM producto WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

export default ProductModel;