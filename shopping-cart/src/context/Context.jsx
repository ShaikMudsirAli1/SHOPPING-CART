import { createContext, useReducer } from "react";
import faker from "faker";
import { CartReducer } from "./Reducers";
import { ProductReducer } from "./Reducers";
import { useContext } from "react";

// We are using createContext function
// to create context.
const Cart = createContext();
// Only renders same data
faker.seed(99);
const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  // useReducer
  const [state, dispatch] = useReducer(CartReducer, {
    products: products,
    cart: [],
  });

  // Filters useReducer
  const [productState, productDispatch] = useReducer(ProductReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });
  console.log(products);
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
