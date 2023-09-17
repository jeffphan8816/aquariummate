
import type { MongoClient } from 'mongodb'
import {Types} from 'mongoose'

interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    // images: Types.Array<string>;
    // category: ICategory;
    // properties: object;
    createdAt: string;
    updatedAt: string;
}

interface ICategory {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface IOrder {
    id: number;
    email: string;
    city: string;
    postalCode: string;
    streetAddress: string;
    country: string;
    total: number;
    status: string;
    products:  Types.DocumentArray<IProduct>;
    createdAt: string;
    updatedAt: string;
}


declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }
}