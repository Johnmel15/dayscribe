import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  closeBtnName?: string;
  submitBtnName?: string;
  onClose: () => void;
  handleSubmit?: () => void;
  showSubmitBtn?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  closeBtnName = "Close",
  submitBtnName = "Submit",
  showSubmitBtn = false,
  onClose,
  handleSubmit,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={handleClose}
              ></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{content}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
                <button
                  type="button"
                  className="btn btn-error text-white"
                  onClick={handleClose}
                >
                  {closeBtnName}
                </button>
                &nbsp;
                {showSubmitBtn && (
                  <button
                    type="button"
                    className="btn btn-success text-white"
                    onClick={handleSubmit}
                  >
                    {submitBtnName}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
