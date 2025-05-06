const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/server.js');
const taskRoutes = require('./Router/Product.js'); 

const app = express();
app.use(cors()); 
app.use(express.json());
app.use("/", taskRoutes);

connectDB()

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
