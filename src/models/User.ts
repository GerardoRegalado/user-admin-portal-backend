import { Schema, model, Document } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default model<UserInterface>("User", userSchema);
