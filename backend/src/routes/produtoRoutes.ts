import { Router } from "express";
import * as Produto from "../controllers/produtoController";

const router = Router();
router.get("/", Produto.listar);
router.post("/", Produto.criar);
router.put("/:id", Produto.atualizar);
router.delete("/:id", Produto.deletar);
export default router;
