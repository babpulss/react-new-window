import PropTypes from "prop-types";
import { useEffect } from "react";
import NewImprovedWindow from "react-new-improved-window";
import useStore from "./store/useStore";

function Modal({ closeModal, wasOpen }) {
  const { modalData } = useStore();

  useEffect(() => {
    wasOpen.current = true;
  }, [wasOpen]);

  return (
    <NewImprovedWindow
      title="모달 창입니다"
      center
      onUnload={() => {
        console.log("unload", wasOpen.current);
        closeModal();
      }}
    >
      <div className="modal">
        <div>on modal</div>
        <h2>{modalData?.title}</h2>
        <p>{modalData?.message}</p>
        <button onClick={closeModal}>close</button>
      </div>
    </NewImprovedWindow>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  wasOpen: PropTypes.object.isRequired,
};

export default Modal;
