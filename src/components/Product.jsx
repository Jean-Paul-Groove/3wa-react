import "./product.css";
import Trash from "./icons/Trash";
import Edit from "./icons/Edit";
import DeleteConfirmation from "./DeleteConfirmation";
import { useState } from "react";
import Modal from "./Modal";
import ProductForm from "./ProductForm";
const Product = ({ name, description, price, id, dispatch }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const deleteProduct = () => {
    dispatch({ type: "delete_product", idToDelete: id });
  };
  return (
    <article className="product-card">
      {deleteConfirmOpen ? (
        <DeleteConfirmation
          productName={name}
          confirmAction={() => deleteProduct()}
          closeConfirm={() => setDeleteConfirmOpen(false)}
        />
      ) : (
        <>
          <div className="product-card__header">
            <h3 className="product-card__title">{name}</h3>
            <div className="product-card__actions-container">
              <button
                onClick={() => setEditModalOpen(true)}
                className="product-card__action-button"
              >
                <Edit className="product-card__action-icon" />{" "}
              </button>
              <button
                onClick={() => setDeleteConfirmOpen(true)}
                className="product-card__action-button"
              >
                <Trash className="product-card__action-icon" />
              </button>
            </div>
          </div>
          <p className="product-card__description">{description}</p>
          <div className="product-card__price-tag">{price} €</div>
        </>
      )}
      {editModalOpen && (
        <Modal closeModal={() => setEditModalOpen(false)}>
          <ProductForm
            dispatch={dispatch}
            typeOfForm="edit"
            closeForm={() => setEditModalOpen(false)}
            previousProduct={{ id, name, description, price }}
          />{" "}
        </Modal>
      )}
    </article>
  );
};

export default Product;
