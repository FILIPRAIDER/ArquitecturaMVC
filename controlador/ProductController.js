import ProductModel from "../modelo/ProductModel.js";

const ProductController = {
  async addProduct(req, res) {
    try {
      const { nombre, precio } = req.body;
      if (!nombre || precio <= 0) {
        return res.status(400).json({ error: "Datos inválidos" });
      }

      const newProduct = await ProductModel.addProduct(nombre, precio);
      res.json({ message: "Producto agregado correctamente.", producto: newProduct });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listProducts(req, res) {
    try {
      const products = await ProductModel.listProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const rowsDeleted = await ProductModel.deleteProduct(id);
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: "Producto no encontrado." });
      }
      res.json({ message: "Producto eliminado correctamente." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default ProductController;