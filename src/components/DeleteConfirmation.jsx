import "./deleteConfirmation.css";

const DeleteConfirmation = ({ closeConfirm, confirmAction, productName }) => {
  return (
    <div className="delete-confirmation">
      <p>Souhaitez vous vraiment supprimer "{productName}" ?</p>
      <div className="delete-confirmation__button-container">
        <button
          className="delete-confirmation__button"
          onClick={() => confirmAction()}
        >
          Valider
        </button>{" "}
        <button className="delete-confirmation__button" onClick={closeConfirm}>
          Annuler
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
