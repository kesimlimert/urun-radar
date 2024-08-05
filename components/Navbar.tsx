import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";
import Logo from "../public/logo.png";

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Image src={Logo} width={200} height={100} alt="Ürün Radar" />
        <AuthButton />
      </div>
    </nav>
  );
};
