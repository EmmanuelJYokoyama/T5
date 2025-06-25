import { Router } from "express";
import { registrar, listar } from "../controllers/consumoController";

const router = Router();

router.post("/", (req, res, next) => {
	Promise.resolve(registrar(req, res)).catch(next);
});
router.get("/", listar);

export default router;
