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

    // ✅ 1️⃣ Verificar archivos estáticos
    const staticPath = path.join(__dirname, "public");
    console.log(`📂 Serviendo archivos estáticos desde: ${staticPath}`);
    app.use(express.static(staticPath));

    // ✅ 2️⃣ Asegurar que Render sirva archivos JS con el MIME correcto
    app.use((req, res, next) => {
      if (req.path.endsWith(".js")) {
        res.type("application/javascript");
      }
      next();
    });

    // ✅ 3️⃣ Servir archivos de la API
    app.use("/api", productRoutes);

    // ✅ 4️⃣ Servir `index.html` si no se encuentra otra ruta
    app.get("*", (req, res) => {
      const indexPath = path.join(staticPath, "index.html");
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error("❌ Error sirviendo index.html:", err.message);
          res.status(500).send("Error cargando la vista");
        }
      });
    });

    // ✅ 5️⃣ Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    // ✅ 6️⃣ Manejar el cierre del servidor
    process.on("SIGINT", () => {
      console.log("🛑 Servidor detenido manualmente.");
      process.exit();
    });

  } else {
    console.error("❌ No se pudo conectar a la base de datos. El servidor no se iniciará.");
  }
};

startServer();
