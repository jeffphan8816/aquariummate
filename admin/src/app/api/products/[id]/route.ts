import { Product } from "@/models/Product.model";
import { mongooseConnect } from "@/lib/mongoose";
import { IProduct } from "@/types/backend";

export async function GET(request:Request, context: { params: {id: string} }) {
  await mongooseConnect();
  const product = await Product.findOne({_id: context.params.id});
  return Response.json( product );
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

// export async function DELETE(request: Request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await mongooseConnect();
//   await Product.findByIdAndDelete(id);
//   return Response.json({ message: "Topic deleted" }, { status: 200 });
// }
