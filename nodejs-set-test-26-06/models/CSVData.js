import mongoose from 'mongoose';
const csvDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
export default mongoose.model('CSVData', csvDataSchema);
