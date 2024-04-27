import multer, { diskStorage } from "multer";
//middleware for image upload
//processes the image and saves it to the server
var storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
export default upload;
