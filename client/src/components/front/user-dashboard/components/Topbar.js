import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Modal from "./Modal";
import Navbar from "./Navbar";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const { width } = useWindowDimensions();

  const openModal = () => {
    !render && setRender(true);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open && width >= 640) {
      closeModal();
    }
  }, [open, width]);

  return (
    <div className="h-full flex items-center justify-between px-4  drop-shadow-md border-b border-gray-400/20 backdrop-blur">
      {/* <Link to="/"> */}
      <Link
        to="/"
        className="flex flex-shrink-0 items-center  text-black font-medium"
      >
        {/* <img
          className="block h-10 w-auto lg:hidden"
          src="assets/front/images/mindtoheart.ogo.png"
          alt="Mind To Heart"
        />
        <img
          className="hidden h-8 w-auto lg:block"
          src="assets/front/images/mindtoheart.ogo.png"
          alt="Mind To Heart"
        /> */}
        <div className="flex flex-shrink-0 items-center  text-black font-medium">
          <img
            className="block h-10 w-auto lg:hidden"
            src={`${process.env.REACT_APP_URL}/assets/front/images/mindtoheart.ogo.png`}
            alt="Mind To Heart"
          />
          <img
            className="hidden h-8 w-auto lg:block"
            src={`${process.env.REACT_APP_URL}/assets/front/images/mindtoheart.ogo.png`}
            alt="Mind To Heart"
          />
          Mind To Heart
        </div>
      </Link>
      {/* </Link> */}
      <button className="block sm:hidden" onClick={openModal}>
        <i className="uil uil-bars"></i>
      </button>

      {render && (
        <Modal
          open={open}
          closeModal={closeModal}
          stylingClasses={`${open ? "open-sidebar" : "close-sidebar"}`}
        >
          <Navbar closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Topbar;
