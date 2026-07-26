const express = require('express');
const router = express.Router();
const quadraController = require('../controllers/quadraController');

router.post('/', quadraController.criar);
router.get('/', quadraController.listar);
router.get('/:id', quadraController.buscarPorId);
router.put('/:id', quadraController.atualizar);
router.delete('/:id', quadraController.deletar);

module.exports = router;