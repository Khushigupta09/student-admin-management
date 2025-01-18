import { Bounce, toast } from "react-toastify";

export const succesPopUp = (message) => {
  toast.success(message, {
    position: "top-center",
    draggable: true,
    autoClose: 3000,
    closeOnClick: true,
    progress: undefined,
    // hideProgressBar:true,
    theme: "light",
    transition: Bounce,
  });
};
export const errorPopUp = (message) => {
  toast.error(message,
    {
      position: "top-center",
      draggable: true,
      autoClose: 3000,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
};


