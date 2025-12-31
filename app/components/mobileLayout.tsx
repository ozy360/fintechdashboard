"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Nav from "./nav";
import { IconMenu, IconX } from "@tabler/icons-react";

export default function MobileLayout() {
  const [open, setOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window) {
        const newWidth = window.innerWidth;
        setScreenWidth(newWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="bg-gray-100 border-b border-[#dee2e6] flex items-center justify-between px-4 py-2 lg:hidden">
        <div className="lg:inline-block text-[30px]">
          <Image src={"/logo.png"} width={40} height={40} alt="logo" />
        </div>
        <div
          className="cursor-pointer text-black"
          onClick={() => setOpen(!open)}
        >
          {open ? <IconX stroke={1.6} /> : <IconMenu stroke={1.6} />}
        </div>
      </div>

      {screenWidth < 1024 && (
        <>
          {open && (
            <>
              <div
                className={`z-10 h-full w-full transform py-4 bg-gray-100 transition-transform dark:bg-transparent dark:text-primary ${
                  open ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {" "}
                <Nav />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
