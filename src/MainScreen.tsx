import React, { useRef, useState } from "react";
import NewImprovedWindow from "react-new-improved-window";
import { useModal } from "./useModal";

export default function MainScreen() {
  const { openModal, Modal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <button className="bg-blue-500" onClick={() => setIsOpen(true)}>
        open new window
      </button>
      {isOpen && (
        <NewImprovedWindow
          title="새 창 모달"
          onClose={() => setIsOpen(false)}
          features={{ width: 500, height: 500 }}
        >
          <div
            ref={containerRef}
            onClick={() => {
              openModal({
                title: "새 창 모달",
                component: () => {
                  return <div>새 창 모달</div>;
                },
                portal: false,
                slot: containerRef.current,
              });
            }}
          >
            새 창 모달
          </div>
          <Modal />
        </NewImprovedWindow>
      )}
    </>
  );
}
