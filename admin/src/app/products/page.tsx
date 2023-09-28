"use client";
import Modal from "@/components/Modal";
import ProductForm from "@/components/ProductForm";
import { IProduct } from "@/types/backend";
import Link from "next/link";
import { title } from "process";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface IFormProp {
  title: string;
  product?: IProduct;
  showModal: boolean;
}
export default function Products() {
  // const [products,setProducts] = useState([]);
  // const fetcher = (url:string) => fetch(url).then(res => res.json())
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, error, isLoading } = useSWR("/api/products", fetcher);
  
  // const { data, error, isLoading } = useSWR('/api/products', fetcher)
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="rounded-lg">
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add new product"
      >
        <ProductForm setShowModal={setShowModal}/>
      </Modal>
      <button
        className="btn-primary"
        onClick={() =>
          setShowModal(true)
        }
      >
        Add new product
      </button>
      <table className="basic mt-3">
        <thead>
          <tr>
            <td>Product name</td>
            <td>Description </td>
            <td>Settings</td>
          </tr>
        </thead>
        <tbody>
          {data.products.map((product: IProduct) => (
            <tr key={product._id}>
              <td className="capitalize">{product.name}</td>
              <td>{product.description}</td>
              <td>
                <Link
                  className="btn-default"
                  href={"/products/edit/" + product._id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Edit
                </Link>
                <Link
                  className="btn-red"
                  href={"/products/delete/" + product._id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
