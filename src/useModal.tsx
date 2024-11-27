import { forwardRef, useCallback, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export type ModalProps = {
  openModal: (props: OpenModalProps) => void;
  onClose: () => void;
};

export type OpenModalProps = {
  title: string;
  description?: string;
  overlay?: boolean;
  slot?: HTMLDivElement | null;
  portal?: boolean;
  onDismiss?: () => void;
};

export default function withModal<T extends ModalProps>(
  Component: React.ComponentType<T>,
) {
  return forwardRef<unknown, Omit<T, keyof ModalProps>>((props, ref) => {
    const { openModal, closeModal, Modal } = useModal();
    return (
      <>
        <Component
          {...(props as unknown as T)}
          openModal={openModal}
          onClose={closeModal}
          ref={ref}
        />
        <Modal />
      </>
    );
  });
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const titleRef = useRef<string>("");
  const descriptionRef = useRef("");
  const overlayRef = useRef(true);
  const portalRef = useRef(true);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const onDismissRef = useRef<(() => void) | null>(null);

  const openModal = useCallback(
    ({
      title,
      description,
      overlay = true,
      portal = true,
      slot,
      onDismiss,
    }: {
      title: string;
      description?: string;
      overlay?: boolean;
      portal?: boolean;
      slot?: HTMLDivElement | null;
      onDismiss?: () => void;
    }) => {
      titleRef.current = title;
      descriptionRef.current = description ?? "";
      overlayRef.current = overlay;
      portalRef.current = portal;
      slotRef.current = slot;
      onDismissRef.current = onDismiss ?? null;
      setIsOpen(true);
    },
    [],
  );
  const closeModal = useCallback(() => {
    setIsOpen(false);
    onDismissRef.current?.();
  }, [setIsOpen]);

  return {
    openModal,
    closeModal,
    Modal: forwardRef<HTMLElement, { ref?: React.RefObject<HTMLElement> }>(
      (props, ref) => {
        return (
          <Dialog
            open={isOpen}
            onClose={closeModal}
            container={slotRef.current}
          >
            <DialogContent>
              <DialogTitle>{titleRef.current}</DialogTitle>
            </DialogContent>
          </Dialog>
        );
      },
    ),
  };
};
