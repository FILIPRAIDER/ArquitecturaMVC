import express from "express";
import cors from "cors";
import "dotenv/config";
import productRoutes from "./routes/ProductRoutes.js";
import { testDBConnection } from "./modelo/ProductModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
  const isDBConnected = await testDBConnection();

  if (isDBConnected) {
    const PORT = process.env.PORT || 3000;

    // Verificar archivos estáticos
    const staticPath = path.join(__dirname, "public");
    console.log(`📂 Serviendo archivos estáticos desde: ${staticPath}`);
    app.use(express.static(staticPath));

    // Rutas de la API
    app.use("/api", productRoutes);

    // Servir la vista en rutas desconocidas
    app.get("*", (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    // Manejo de cierre del servidor
    process.on("SIGINT", () => {
      console.log("🛑 Servidor detenido manualmente.");
      process.exit();
    });

  } else {
    console.error("❌ No se pudo conectar a la base de datos. El servidor no se iniciará.");
  }
};

startServer();
