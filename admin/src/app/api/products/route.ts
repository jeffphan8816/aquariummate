import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product.model";
import { mongooseConnect } from "@/lib/mongoose";
import { IProduct } from "@/types/backend";

export async function GET() {
  await mongooseConnect();
  const products = await Product.find();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const { name, description, price } = await request.json();

  await mongooseConnect();
  const productDoc = await Product.create({
    name,
    description,
    price,
  });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}


export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await mongooseConnect();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
