import pool from "../db/conexion.js";
import { ProductQueries } from "./queries.js";
import ProductModel from "./ProductModel.js";

class ProductService {
  static async addProduct(nombre, precio) {
    try {
      const [result] = await pool.execute(ProductQueries.ADD_PRODUCT, [nombre, precio]);
      return new ProductModel(result.insertId, nombre, precio);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  }

  static async listProducts() {
    try {
      const [rows] = await pool.execute(ProductQueries.LIST_PRODUCTS);
      return rows.map(row => new ProductModel(row.ID, row.Nombre, row.Precio));
    } catch (error) {
      console.error("Error al listar productos:", error);
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      const [result] = await pool.execute(ProductQueries.DELETE_PRODUCT, [id]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  }
}

export default ProductService;