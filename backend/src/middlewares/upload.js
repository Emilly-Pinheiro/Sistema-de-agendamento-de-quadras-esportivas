const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads', 'quadras'),
    filename: (req, file, cb) => {
        const nomeUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, nomeUnico);
    },
});

const upload = multer({ storage });

module.exports = upload;
