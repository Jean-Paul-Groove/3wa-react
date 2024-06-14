import "./product.css";

const Product = ({ name, description, price }) => {
  return (
    <article className="product-card">
      <h3 className="product-card__title">{name}</h3>
      <p className="product-card__description">{description}</p>
      <div className="product-card__price-tag">{price} €</div>
    </article>
  );
};

export default Product;
