import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { UserInterface } from "../models/User";

/**
* Create User
**/

export const registerUser = async (req: Request, res: Response) => {

  const { name, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

/**
* User Login
**/

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h"
    });

    res.status(200).json({ token, user: { name: user.name, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

/**
* Read Users
**/

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

/**
* Get Users by ID
**/

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
};

/**
* Update Users by ID
**/

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, username, email, password } = req.body as {
      name?: string; username?: string; email?: string; password?: string;
    };

    const update: any = {};
    if (name !== undefined) update.name = name;
    if (username !== undefined) update.username = username;
    if (email !== undefined) update.email = email;
    if (password !== undefined) update.password = await bcrypt.hash(password, 10);

    const updated = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      projection: { password: 0 }
    });

    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (err: any) {
    // 11000 => duplicate key (email/username)
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Duplicate key", keyValue: err.keyValue });
    }
    res.status(500).json({ message: "Error updating user", error: err });
  }
};

/**
* Delete Users by ID
**/

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    // 204: No content
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Error deleting user", error: err });
  }
};

