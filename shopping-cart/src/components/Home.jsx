import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
    productState: { byStock, byFastDelivery, sort, byRating, searchQuery },
  } = CartState();

  // Transform Products Logic
  // Sorting

  const transformProducts = () => {
    let sortedProducts = [...products]; // Create a new copy of the products array

    if (sort === "lowToHigh") {
      sortedProducts.sort((a, b) => {
        // Sort from low to high (ascending order)
        return a.price - b.price;
      });
    } else if (sort === "highToLow") {
      sortedProducts.sort((a, b) => {
        // Sort from high to low (descending order)
        return b.price - a.price;
      });
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => {
        prod.name.toLowerCase().includes(searchQuery);
      });
    }
    return sortedProducts;
  };

  // console.log(products);
  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
