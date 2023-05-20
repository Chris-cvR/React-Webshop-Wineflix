import React from 'react';
import { SHA256 } from "crypto-js";

export interface ProductData {
  brand: string;
  description: string;
  id: number;
  image: string;
  list_price: number;
  name: string;
  country: string;
  year: number;
  category: string;
  price: number;
  url: string;
  quantity: number;
}

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  product_data: ProductData[];
  count: number;
  total: number;
};



type ContextProps = {
  user: User
  updateUser: (user: User) => void;
};



export function generateHash(userAgent: string): string {
  return SHA256(userAgent).toString();
}


export const UserContext = React.createContext<ContextProps>({
  user: { firstname: '', lastname: '', email: generateHash(navigator.userAgent), product_data: [], count: 0, total: 0 },
  updateUser: () => {},
});
