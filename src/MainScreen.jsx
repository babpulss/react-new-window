import { useState, useCallback, useRef, useEffect } from "react";
import Modal from "./modal";
import useStore from "./store/useStore";
import { mapboxshpwrite } from "./util";

export default function MainScreen() {
  const [showModal, setShowModal] = useState(false);
  const wasOpen = useRef(false);
  const { modalData, setModalData } = useStore();

  const openNewWindow = useCallback(() => {
    if (showModal) return;

    setModalData({
      title: "새 창에서 열린 모달" + Date.now(),
      message: "zustand로 상태가 공유됩니다",
    });
    setShowModal(true);
    wasOpen.current = true;
  }, [showModal, setModalData]);

  const handleCloseModal = () => {
    wasOpen.current = false;
    setShowModal(false);
    console.log("first", wasOpen.current, showModal);
  };

  useEffect(() => {
    console.log("second", wasOpen.current, showModal);
    setShowModal(wasOpen.current);
  }, [showModal]);

  return (
    <>
      <button onClick={openNewWindow}>open new window</button>
      <button onClick={mapboxshpwrite}>Click me</button>
      <div>{modalData?.title}</div>
      <div>
        {showModal.toString()} || {wasOpen.current.toString()}
      </div>
      {(showModal || wasOpen.current) && (
        <Modal wasOpen={wasOpen} closeModal={handleCloseModal} />
      )}
    </>
  );
}
