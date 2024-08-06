import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";
import Logo from "../public/logo.png";
import { createClient } from "@/utils/supabase/server";
import ProfileButton from "./ProfileButton";


export default async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Image src={Logo} width={200} height={100} alt="Ürün Radar" />
        <div className="flex gap-3">
          <AuthButton />
          {user ? <ProfileButton /> : null}
        </div>
      </div>
    </nav>
  );
};
