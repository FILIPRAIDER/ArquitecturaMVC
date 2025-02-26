import { fetchProducts, addProduct, deleteProduct } from "./productservice.js";

window.deleteProduct = async function (id) {
    await deleteProduct(id);
    renderProducts();
};

async function renderProducts() {
    const products = await fetchProducts();
    console.log("🔍 API Response:", products);

    if (!Array.isArray(products)) {
        console.error("❌ Error: fetchProducts no devolvió un array", products);
        return;
    }

    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="name">${product.nombre}  <span class="price"><small>💲</small>${product.precio} </span></span>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">❌</button>
        `;
        productList.appendChild(li);
    });
}


document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("productName").value;
    const precio = document.getElementById("productPrice").value;
    await addProduct(nombre, precio);
    document.getElementById("productForm").reset();
    renderProducts();
});

renderProducts();

