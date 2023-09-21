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
  const { name, description, price,category,images } = await request.json();
  // console.log(request.json());

  await mongooseConnect();
  await Product.findByIdAndUpdate(context.params.id, {title:name,description:description,price:price});
  return Response.json(true);
}

// export async function DELETE(request: Request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await mongooseConnect();
//   await Product.findByIdAndDelete(id);
//   return Response.json({ message: "Topic deleted" }, { status: 200 });
// }
