import ProductModel from "../modelo/ProductModel.js";

const ProductController = {
  async addProduct(req, res) {
    try {
      const { name, price } = req.body;
      if (!name || price <= 0) {
        return res.status(400).json({ error: "Datos inválidos" });
      }

      await ProductModel.addProduct(name, price);
      res.json({ message: "✅ Producto agregado correctamente." });
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
        return res.status(404).json({ error: "⚠️ Producto no encontrado." });
      }
      res.json({ message: "✅ Producto eliminado correctamente." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default ProductController;