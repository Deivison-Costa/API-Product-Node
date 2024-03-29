const multer = require('multer');

// configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

// instancia o multer
const upload = multer({ storage: storage });

module.exports = upload;