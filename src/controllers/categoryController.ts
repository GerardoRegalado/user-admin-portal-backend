import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error creating category", error: err });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body as { name?: string; description?: string };

    const updated = await Category.findByIdAndUpdate(
      id,
      { ...(name !== undefined && { name }), ...(description !== undefined && { description }) },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (err: any) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Duplicate key", keyValue: err.keyValue });
    }
    res.status(500).json({ message: "Error updating category", error: err });
  }
};
