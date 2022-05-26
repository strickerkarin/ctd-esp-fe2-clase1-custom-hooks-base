import { useState } from 'react';

export default function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState('');

  const open = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const close = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const toggle = (selected) => {
    setIsOpen((prevState) => !prevState);
    setSelection(selected);
  }

  return {
    isOpen,
    isClosed: !isOpen,
    open,
    close,
    toggle    
  };
}
