import "./modal.css";

const Modal = ({ children, closeModal }) => {
  return (
    <div
      className="modal__overlay"
      onClick={() => {
        closeModal();
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <button className="modal__close-button" onClick={() => closeModal()}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
