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


const staticPath = path.join(__dirname, "public");
console.log(`📂 Serviendo archivos estáticos desde: ${staticPath}`);
app.use(express.static(staticPath));


app.get("/*.js", (req, res, next) => {
  const filePath = path.join(staticPath, req.path);
  if (filePath.endsWith(".js")) {
    res.type("application/javascript");
  }
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`❌ Error cargando archivo JS: ${req.path}`, err.message);
      res.status(404).send("Archivo no encontrado");
    }
  });
});

app.use("/api", productRoutes);


app.get("*", (req, res) => {
  const indexPath = path.join(staticPath, "index.html");
  res.sendFile(indexPath);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("🛑 Servidor detenido manualmente.");
  process.exit();
});
