import { fetchProducts, addProduct, deleteProduct } from "./productservice.js";

function renderProducts(products) {
    console.log("📦 Productos recibidos en renderProducts:", products);
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
        console.log("🛒 Producto individual:", product);
        productList.innerHTML += `
            <div class="product-item">
                ${product.Nombre} - 💲${product.Precio}
                <button class="delete-btn" onclick="deleteProduct(${product.id})">❌</button>
            </div>
        `;
    });
}


document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    await addProduct(name, price);
    document.getElementById("productForm").reset();
    renderProducts();
});

renderProducts();
