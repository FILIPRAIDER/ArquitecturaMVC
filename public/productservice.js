const API_URL = "https://arquitecturamvc.onrender.com/api";

export async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("🔍 API Response:", data);
        return data;
    } catch (error) {
        console.error("❌ Error obteniendo productos:", error);
    }
}

export async function addProduct(nombre, precio) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, precio }),
        });
        return await response.json();
    } catch (error) {
        console.error("Error agregando producto:", error);
    }
}


export async function deleteProduct(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch (error) {
        console.error("Error eliminando producto:", error);
    }
}
