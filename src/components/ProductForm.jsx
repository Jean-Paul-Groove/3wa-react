import { useState } from "react";
import "./productForm.css";
const ProductForm = ({ addProduct }) => {
  const emptyFormData = {
    name: "",
    description: "",
    price: 0,
  };
  const [formData, setFormData] = useState({ emptyFormData });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price) {
      addProduct({ ...formData });
    }
  };
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2 className="product-form__title">Nouveau produit </h2>
      <div className="product-form__fields-container">
        <label className="product-form__field" htmlFor="name">
          {" "}
          Le nom du produit:
          <input
            className="product-form__field-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description" className="product-form__field">
          {" "}
          La description du produit:
          <textarea
            className="product-form__field-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label htmlFor="price" className="product-form__field">
          Le prix du produit:
          <input
            className="product-form__field-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
      </div>
      <button className="product-form__button">Ajouter le produit ! </button>
    </form>
  );
};

export default ProductForm;
