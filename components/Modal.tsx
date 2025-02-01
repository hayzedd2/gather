"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 backdrop-blur-sm bg-black/30 z-40 transition-opacity duration-200 ease-out
          ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`bg-white rounded-lg light-shadow w-full max-w-md relative `}
          onClick={(e) => e.stopPropagation()}
        >
         
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
