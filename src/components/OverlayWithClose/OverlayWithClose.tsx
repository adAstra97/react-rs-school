interface OverlayWithCloseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OverlayWithClose = ({
  isOpen,
  onClose,
}: OverlayWithCloseProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute inset-0 bg-black/50 z-20 cursor-pointer`}
      onClick={onClose}
    />
  );
};
