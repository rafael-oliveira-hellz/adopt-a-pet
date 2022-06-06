const multer = require('multer');
const path = require('path');
import { Request } from 'express';

// Destination to store the images
const imageStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {

    let folder = '';

    if (req.baseUrl.includes('users')) {
      folder = 'users';
    } else if (req.baseUrl.includes('pets')) {
      folder = 'pets';
    }

    cb(null, `src/public/images/${folder}`);
  },

  filename: (req: Request, file: any, cb: any) => {

    const imageFileName = file.fieldname.substring(0,6) + '-' + Date.now() + String(Math.floor(Math.random() * (Math.pow(20, 15)))) + path.extname(file.originalname);

    cb(null, imageFileName);
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize:  2 * 1024 * 1024 },
  fileFilter: (req: Request, file: any, cb: any) => {
    const fileTypes = /jpeg|jpg|png|jfif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error(`Error: O upload de arquivos apenas aceita as seguintes extensões de arquivos: ${fileTypes}`));

  }
});

export default imageUpload;

