import Product from "./Product";
import "./productList.css";
const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      <h2 className="product-list__title">Nos produits disponibles: </h2>
      <div className="product-list__grid">
        {products?.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
