"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import useSWR from "swr";
import { IFormProp } from "../../page";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { data, error, isLoading } = useSWR("/api/products/" + id, fetcher);
  const [showModal, setShowModal] = useState<boolean>(false);

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
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
