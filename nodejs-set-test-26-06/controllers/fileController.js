import parseCSV from "../utils/parseeCSV.js";
import CSVData from '../models/CSVData.js';
export const uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'CSV file required' });

  try {
    const data = await parseCSV(req.file.path);
    await CSVData.insertMany(data);
    res.json({ message: 'CSV uploaded and imported successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
