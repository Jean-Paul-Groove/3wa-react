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
    // On vérifie si une liste de produits est enregistrée dans le localStorage
    const savedProducts = localStorage.getItem("listOfProducts");

    if (savedProducts) {
      // Si c'est bien le cas on met à jour la liste de produits
      dispatch({ type: "set_complete_list", list: JSON.parse(savedProducts) });
    }

    // Dans tous les cas on indique que le premier render est passé
    setIsFirstRender(false);
  }, []);
  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem("listOfProducts", JSON.stringify(products));
    }
  }, [products]);
  return (
    <main className="product-page">
      <h1 className="product-page__title">Produits</h1>
      <ProductForm dispatch={dispatch} />
      {products.length > 0 && <ProductList products={products} />}
    </main>
  );
};

export default App;
