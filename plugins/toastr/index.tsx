import React, { FC, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const ToastrComponent = (props: any) => {
  const { type, message } = props;
  useEffect(() => {
    toastr.options = {
      positionClass: "toast-top-right",
      hideDuration: 300,
      timeOut: 2000,
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: true,
    };
    toastr[type](message);
  }, [type, message]);

  return <div></div>;
};

export default ToastrComponent;
