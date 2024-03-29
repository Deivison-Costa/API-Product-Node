const multer = require('multer');

// configuração do multer
const storage = multer.diskStorage({
  destination: function (cb) {
    cb(null, './uploads'); 
  },
  filename: function (file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

// instancia o multer
const upload = multer({ storage: storage });

module.exports = upload;
