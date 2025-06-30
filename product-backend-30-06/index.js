import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import router from './routes/productRouter.js';


dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(cors());
app.use(express.json());

app.use('/api/product', router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});