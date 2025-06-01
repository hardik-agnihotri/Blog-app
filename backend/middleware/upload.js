import multer from "multer";
import path from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cd(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg | jpg | png /;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if(extname && mimetype){
    cb(null,true);
  }else{
    cb("images only");
  }
};

const upload = multer({storage,fileFilter});

export default upload;
