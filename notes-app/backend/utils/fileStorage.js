const fs = require("fs-extra");
const path = require("path");

const readData = async (file) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "..", "data", file), "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

const writeData = async (file, data) => {
  await fs.writeFile(path.join(__dirname, "..", "data", file), JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
