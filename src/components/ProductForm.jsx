import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import "./productForm.css";
const ProductForm = ({
  dispatch,
  typeOfForm = "new",
  previousProduct,
  closeForm,
}) => {
  const emptyFormData = {
    name: "",
    description: "",
    price: "",
    id: "",
  };
  const [formData, setFormData] = useState({ emptyFormData });
  useEffect(() => {
    if (typeOfForm === "edit" && previousProduct) {
      setFormData({ ...previousProduct });
    }
  }, []);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.price) {
      if (typeOfForm === "new") {
        dispatch({
          type: "add_product",
          newProduct: { ...formData, id: uuid() },
        });

        resetForm();
      }

      if (typeOfForm === "edit") {
        dispatch({
          type: "update_product",
          updatedProduct: { ...formData },
        });
        closeForm();
      }
    }
  };
  // J'ai essayé de reset les fields avec une ref mais ça ne render pas et le champ garde la valeur du state, du coup je reset par le state mais j'utilise la ref pour le focus sur name
  const resetForm = () => {
    setFormData({ ...emptyFormData });
    nameRef.current.focus();
    if (closeForm) {
      closeForm();
    }
  };
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2 className="product-form__title">
        {typeOfForm === "edit" ? "Modifications" : "Nouveau produit"}{" "}
      </h2>
      <div className="product-form__fields-container">
        <label className="product-form__field" htmlFor="name">
          {" "}
          Le nom du produit:
          <input
            ref={nameRef}
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
            ref={descriptionRef}
            className="product-form__field-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label htmlFor="price" className="product-form__field">
          Le prix du produit:
          <input
            ref={priceRef}
            className="product-form__field-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step={0.01}
          />
        </label>
      </div>
      <button className="product-form__button">
        {typeOfForm === "edit"
          ? "Modifier le produit !"
          : "Ajouter le produit !"}
      </button>
    </form>
  );
};

export default ProductForm;
