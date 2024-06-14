import Product from "./Product";
import "./productList.css";
const ProductList = ({ products, dispatch }) => {
  return products.length ? (
    <div className="product-list">
      <h2 className="product-list__title">Nos produits disponibles: </h2>
      <div className="product-list__grid">
        {products?.map((product) => (
          <Product key={product.id} {...product} dispatch={dispatch} />
        ))}
      </div>
    </div>
  ) : (
    <p className="product-list">Pas de produits dans nos stocks ....</p>
  );
};

export default ProductList;
