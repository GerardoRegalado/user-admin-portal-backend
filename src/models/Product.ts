import { Schema, model, Document } from "mongoose";
import { CategoryDoc } from "./Category";

export interface ProductDoc extends Document {
  name: string;
  description: string;
  price: number;
  category: CategoryDoc["_id"]; // relación con categoría
}

const productSchema = new Schema<ProductDoc>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
});

export default model<ProductDoc>("Product", productSchema);
