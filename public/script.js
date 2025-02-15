import { fetchProducts, addProduct, deleteProduct } from "./productservice.js";

async function renderProducts() {
    const products = await fetchProducts();
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    console.log(products);

    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name} - 💲${product.price}
            <button class="delete-btn" onclick="deleteProduct(${product.ID})">❌</button>
        `;
        productList.appendChild(li);
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
