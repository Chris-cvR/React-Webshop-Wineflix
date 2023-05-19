import React from 'react';

interface ProductData {
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

type User = {
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


export const UserContext = React.createContext<ContextProps>({
  user: { firstname: '', lastname: '', email: '', product_data: [], count: 0, total: 0 },
  updateUser: () => {},
});
