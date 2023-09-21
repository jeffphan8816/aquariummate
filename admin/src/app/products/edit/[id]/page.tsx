"use client";
import ProductForm from "@/components/ProductForm";
import { data } from "autoprefixer";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { data, error, isLoading } = useSWR("/api/products/" + id, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  // const data = {
  //   name: "test",
  //   description: "test",
  //   price: 100,
  //   images: [],
  //   category: [],
  // };

  return (
    <div>
      <h1>Edit product</h1>
      {data && (
        <ProductForm
          productName={data.name}
          productCategory={data.category || []}
          productDesription={data.description}
          productImages={data.images}
          productPrice={data.price}
          productId={data._id}
        />
      )}
    </div>
  );
}
