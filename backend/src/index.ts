import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import clienteRoutes from "./routes/clienteRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import consumoRoutes from "./routes/consumoRoutes";
import relatorioRoutes from "./routes/relatorioRoutes";

dotenv.config();
const app = express();
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:5173"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/consumos", consumoRoutes);
app.use("/relatorios", relatorioRoutes);

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
