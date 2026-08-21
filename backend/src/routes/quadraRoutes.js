const express = require('express');
const router = express.Router();
const quadraController = require('../controllers/quadraController');
const upload = require('../middlewares/upload');

router.get('/', quadraController.listar);
router.get('/:id', quadraController.buscarPorId);
router.post('/', upload.array('imagens'), quadraController.criar);
router.put('/:id', upload.array('imagens'), quadraController.atualizar);
router.delete('/:id', quadraController.deletar);

module.exports = router;
