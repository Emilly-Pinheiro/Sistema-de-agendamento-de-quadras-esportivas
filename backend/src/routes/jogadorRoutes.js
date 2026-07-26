const express = require('express');
const router = express.Router();
const jogadorController = require('../controllers/jogadorController');

router.post('/', jogadorController.criar);
router.get('/', jogadorController.listar);
router.get('/:id', jogadorController.buscarPorId);
router.put('/:id', jogadorController.atualizar);
router.delete('/:id', jogadorController.deletar);

module.exports = router;