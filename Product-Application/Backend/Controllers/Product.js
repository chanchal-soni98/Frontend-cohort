const Task = require('../Models/Product.js');

const createProduct = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        if (!title || !description || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newProduct = new Task({ title, description, status, dueDate });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Task.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Task.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const updateProduct = async (req, res) => {
    try { 
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;
        const product = await Task.findByIdAndUpdate(id, { title, description, status, dueDate }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    }catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Task.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}




module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };