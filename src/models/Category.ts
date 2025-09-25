import { Schema, model, Document } from "mongoose";

export interface CategoryDoc extends Document {
  name: string;
  description?: string;
}

const categorySchema = new Schema<CategoryDoc>({
  name: { type: String, required: true, unique: true },
  description: { type: String }
});

export default model<CategoryDoc>("Category", categorySchema);
