import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') cb(null, true);
  else cb(new Error('Only CSV files are allowed!'), false);
};

export default multer({ storage, fileFilter });
