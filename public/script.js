const API_URL = "https://arquitecturamvc.onrender.com";


async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        console.log(products);

        const productList = document.getElementById("productList");
        productList.innerHTML = "";

        products.forEach(product => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${product.Nombre} - 💲${product.Precio}
                <button class="delete-btn" onclick="deleteProduct(${product.ID})">❌</button>
            `;
            productList.appendChild(li);
        });
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}


document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    if (!name || price <= 0) {
        alert("Ingrese datos válidos");
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price }),
        });

        document.getElementById("productForm").reset();
        fetchProducts();
    } catch (error) {
        console.error("Error agregando producto:", error);
    }
});


async function deleteProduct(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchProducts();
    } catch (error) {
        console.error("Error eliminando producto:", error);
    }
}


fetchProducts();
