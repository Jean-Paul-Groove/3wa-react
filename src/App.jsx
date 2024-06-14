import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const addProduct = (product) => {
    setProducts((prevList) => [...prevList, product]);
  };
  useEffect(() => {
    // On vérifie si une liste de produits est enregistrée dans le localStorage
    const savedProducts = localStorage.getItem("listOfProducts");
    if (savedProducts) {
      // Si c'est bien le cas on met à jour la liste de produits
      setProducts(JSON.parse(savedProducts));
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
      <ProductForm addProduct={addProduct} />
      {products.length > 0 && <ProductList products={products} />}
    </main>
  );
};

export default App;
