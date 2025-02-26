import ProductService from "../modelo/ProductService.js";

const ProductController = {
  async addProduct(req, res) {
    try {
      const { nombre, precio } = req.body;
      if (!nombre || precio <= 0) {
        return res.status(400).json({ error: "Datos inválidos" });
      }

      const newProduct = await ProductService.addProduct(nombre, precio);
      res.json({ message: "Producto agregado correctamente.", producto: newProduct });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listProducts(req, res) {
    try {
      const products = await ProductService.listProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const rowsDeleted = await ProductService.deleteProduct(id);
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
