import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { IProduct } from "@/types/backend";
import { set } from "mongoose";
import { IFormProp } from "@/app/products/page";
// import axios from "axios";
// import Spinner from "@/components/Spinner";
// import {ReactSortable} from "react-sortablejs";

interface IProps {
  productName?: string,
  productDesription?: string,
  productCategory?: string[],
  productPrice?: number,
  productImages?: string[],
  productId?: string,
  // onSave: (name: string, description:string, price:number) => void,
  setShowModal?: (showModal: boolean) => void,

}

export default function ProductForm({productName,productDesription,productCategory,productPrice,productImages,setShowModal, productId}: IProps) {
  const [name,setName] = useState<string>(productName|| '');
  const [description,setDescription] = useState<string>(productDesription|| '');
  const [category,setCategory] = useState(productCategory || []);
  // const [productProperties,setProductProperties] = useState(assignedProperties || {});
  const [price,setPrice] = useState<number>(productPrice || 0);
  const [images,setImages] = useState(productImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const id = productId ? "/" + productId : '';
  const saveProduct = async () => {
    const product = {
      name,
      description,
      price,
      category,
      images,
    };
    
    const res = await fetch("/api/products" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    console.log(data);
    if (setShowModal) {
      setShowModal(false); 
    }
  }
  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (setShowModal) {
      setShowModal(false); 
    }
    router.push('/products');
  }
  return (
      <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        {/* <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div key={p.name} className="">
              <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
              <div>
                <select
                  value={productProperties[p.name]}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                >
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div
                  key={link}
                  className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                >
                  <img src={link} alt="" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Add image</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div> */}
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.valueAsNumber)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
        <button className="btn-primary" onClick={onCancel}>
          Cancel
        </button>
      </form>
  );
}
