import { Product } from "@/models/Product.model";
import { mongooseConnect } from "@/lib/mongoose";

export async function GET() {
  await mongooseConnect();
  const products = await Product.find();
  return Response.json({ products });
}

export async function POST(request: Request) {
  const { name, description, price } = await request.json();

  await mongooseConnect();
  const productDoc = await Product.create({
    name,
    description,
    price,
  });
  return Response.json({ message: "Product Created" }, { status: 201 });
}
