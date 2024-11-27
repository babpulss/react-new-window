import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { forwardRef } from "react";

export const Modal = forwardRef<
  HTMLElement,
  {
    isOpen: boolean;
    title: ModalTitleType;
    description?: string;
    overlay: boolean;
    portal?: boolean;
    onClose: () => void;
  }
>((props, ref) => {
  const { isOpen, overlay, portal, title, description, onClose } = props;
  return portal ? (
    <Dialog open={isOpen} modal={overlay}>
      <DialogContent className="select-none [&>button]:hidden">
        <DialogTitle className="text-lg font-light">{title}</DialogTitle>
        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : (
          <DialogDescription className="sr-only">{title}</DialogDescription>
        )}
        <DialogFooter>
          <Button size="default" onClick={onClose}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    isOpen && (
      <Dialog open={isOpen} modal={overlay}>
        <DialogContent
          className="select-none [&>button]:hidden"
          container={(ref as React.RefObject<HTMLElement>).current || undefined}
        >
          <DialogTitle className="text-lg font-light">{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : (
            <DialogDescription className="sr-only">{title}</DialogDescription>
          )}
          <DialogFooter>
            <Button size="default" onClick={onClose}>
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
});
