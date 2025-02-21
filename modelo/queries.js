export const ProductQueries = {
    ADD_PRODUCT: "INSERT INTO producto (nombre, precio) VALUES (?, ?)",
    LIST_PRODUCTS: "SELECT * FROM producto",
    DELETE_PRODUCT: "DELETE FROM producto WHERE ID = ?",
  };