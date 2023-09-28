"use client";
import useSWR from "swr";

import { useRouter } from "next/navigation";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DeleteProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  function deleteProduct() {
    fetch("/api/products/" + id, {
      method: "DELETE",
    }).then(() => {
      router.push("/products");
    });
  }
  const id = params.id;
  const { data, error, isLoading } = useSWR("/api/products/" + id, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h1 className="text-center">Do you really want to delete
        &nbsp;&quot;{data?.name}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="btn-red">Yes</button>
        <button
          className="btn-default"
          onClick={() => {
            router.push("/products");
          }}>
          NO
        </button>
      </div>
    </div>
  );
}