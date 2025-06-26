import express from 'express';
import upload from '../middleware/upload.js'
import { uploadCSV } from '../controllers/fileController.js'
import auth from '../middleware/auth.js'

const router = express.Router();
router.post('/', auth, upload.single('file'), uploadCSV);

export default router;
