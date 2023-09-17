import { IOrder } from "@/types/backend";
import mongoose, {model, Schema, models} from "mongoose";

const OrderSchema = new Schema<IOrder>(
  {
    id: Number,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    total: Number,
    status: Boolean,
    products: {type:[mongoose.Types.ObjectId], ref:'Product'},
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
