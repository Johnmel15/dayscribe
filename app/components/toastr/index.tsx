import "toastr/build/toastr.min.css";

type ToastrType = {
  [key: string]: (message: string) => void;
};

const initializeToastr = () => {
  if (typeof window !== "undefined") {
    const toastr = require("toastr");
    toastr.options = {
      positionClass: "toast-top-right",
      hideDuration: 300,
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
    };
    return toastr as unknown as ToastrType;
  }
};

const showToast = (message: string, type: string) => {
  const toastrTyped = initializeToastr();
  if (toastrTyped && toastrTyped[type]) {
    toastrTyped[type](message);
  }
};

const ToastrComponent = () => ({
  showToast,
});

export default ToastrComponent;
