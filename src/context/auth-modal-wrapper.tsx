"use client";
import { createContext, useContext, useState } from "react";

type ModalState = {
  signup: boolean;
  signin: boolean;
  forgotPassword: boolean;
  otp: boolean;
  resetPassword: boolean;
};

type ModalContextProps = {
  modalState: ModalState;
  openModal: (modalName: keyof ModalState) => void;
  closeModal: (modalName: keyof ModalState) => void;
};

const AuthModalProviderContext = createContext<ModalContextProps>({
  modalState: {
    signup: false,
    signin: false,
    forgotPassword: false,
    otp: false,
    resetPassword: false,
  },
  openModal: () => {},
  closeModal: () => {},
});

export const useAuthModal = () => useContext(AuthModalProviderContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState({
    signup: false,
    signin: false,
    forgotPassword: false,
    otp: false,
    resetPassword: false,
  });

  const openModal = (modalName: keyof ModalState) => {
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof ModalState) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
  };

  return (
    <AuthModalProviderContext.Provider
      value={{ modalState, openModal, closeModal }}
    >
      {children}
    </AuthModalProviderContext.Provider>
  );
}
