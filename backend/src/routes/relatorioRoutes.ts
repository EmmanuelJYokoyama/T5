import { Router } from "express";
import * as Relatorio from "../controllers/relatorioController";

const router = Router();

router.get("/top10-quantidade", Relatorio.top10MaisConsumiram);
router.get("/top10-menor", Relatorio.top10MenosConsumiram);
router.get("/top5-valor", Relatorio.top5PorValor);
router.get("/por-genero", Relatorio.porGenero);
router.get("/menos-consumidores", Relatorio.top10MenosConsumiram); // alias
router.get("/genero", Relatorio.porGenero);                         // alias
router.get("/mais-consumidos", Relatorio.maisConsumidos);          // nova função

export default router;
