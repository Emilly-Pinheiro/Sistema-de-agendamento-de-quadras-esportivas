const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/', reservaController.criar);
router.get('/', reservaController.listar);
router.put('/:id', reservaController.atualizar);
router.delete('/:id', reservaController.deletar);

module.exports = router;