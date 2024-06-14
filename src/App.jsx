import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import { useEffect, useState, useReducer } from "react";

const App = () => {
  const productsReducer = (state, action) => {
    switch (action.type) {
      case "add_product":
        return [...state, action.newProduct];
      case "delete_product":
        return state.filter((product) => product.id !== action.idToDelete);
      case "update_product":
        return state.map((product) => {
          if (product.id === action.updatedProduct.id) {
            return action.updatedProduct;
          } else {
            return product;
          }
        });
      case "set_complete_list":
        return action.list;
    }
  };
  const [products, dispatch] = useReducer(productsReducer, []);
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    try {
      // On vérifie si une liste de produits est enregistrée dans le localStorage
      const storedList = localStorage.getItem("listOfProducts");
      const savedProducts = JSON.parse(storedList);
      if (savedProducts) {
        // Si c'est bien le cas on met à jour la liste de produits
        dispatch({
          type: "set_complete_list",
          list: JSON.parse(savedProducts),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Dans tous les cas on indique que le premier render est passé
      setIsFirstRender(false);
    }
  }, []);
  useEffect(() => {
    if (!isFirstRender && products.length > 0) {
      localStorage.setItem("listOfProducts", JSON.stringify(products));
    }
  }, [products]);
  return (
    <main className="product-page">
      <h1 className="product-page__title">Super shop 2000</h1>
      <ProductForm dispatch={dispatch} />

      <ProductList products={products} dispatch={dispatch} />
    </main>
  );
};

export default App;
