import { Product } from "@/models/Product.model";
import { mongooseConnect } from "@/lib/mongoose";
import { IProduct } from "@/types/backend";
import { useParams } from "next/navigation";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  await mongooseConnect();
  const product = await Product.findOne({ _id: context.params.id });
  return Response.json(product);
}

export async function POST(request: Request, context: { params: { id: string } }) {
  // console.log(request)
  const { name, description, price} = await request.json();
  // console.log(request.json());

  await mongooseConnect();
  await Product.findByIdAndUpdate(context.params.id, {name:name,description:description,price:price});
  return Response.json(true);
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  await mongooseConnect();
  await Product.findByIdAndDelete(context.params.id);
  return Response.json({ message: "Product deleted" }, { status: 200 });
}
