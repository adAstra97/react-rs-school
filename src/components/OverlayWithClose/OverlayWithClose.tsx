import { useCloseDetails } from '../../hooks/use-close-details';

interface OverlayWithCloseProps {
  isOpen: boolean;
}

export const OverlayWithClose = ({ isOpen }: OverlayWithCloseProps) => {
  const handleClose = useCloseDetails();

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      className={`absolute inset-0 bg-black/50 z-20 cursor-pointer`}
      onClick={handleClose}
    />
  );
};
