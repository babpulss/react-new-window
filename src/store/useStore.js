import { create } from 'zustand';

const useStore = create((set) => ({
  modalData: null,
  isModalOpen: false,
  setModalData: (data) => set({ modalData: data }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));

export default useStore; 