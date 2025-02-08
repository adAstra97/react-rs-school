import { FC } from 'react';

interface OverlayWithCloseProps {
  isOpen: boolean;
  onClose: () => void;
  opacity?: number;
  zIndex?: number;
}

export const OverlayWithClose: FC<OverlayWithCloseProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute inset-0 bg-black/50 z-20 cursor-pointer`}
      onClick={onClose}
    />
  );
};
