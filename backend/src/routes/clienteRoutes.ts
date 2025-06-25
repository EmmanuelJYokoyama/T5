import { Router } from 'express';
import * as ClienteController from '../controllers/clienteController';

const router = Router();

router.get('/', ClienteController.listar);
router.post('/', ClienteController.criar);
router.put('/:id', ClienteController.atualizar);
router.delete('/:id', ClienteController.deletar);

export default router;
