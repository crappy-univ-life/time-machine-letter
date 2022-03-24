import { useState } from 'react';

export default function useModal() {
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  return { openModal, closeModal, modal };
}
