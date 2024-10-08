import React from "react";
import AuthButton from "../buttons/AuthButton";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ProfileButton from "../buttons/ProfileButton";
import Logo from "@/public/logo.png";

export default async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/">
          <Image src={Logo} quality={100} width={150} height={100} alt="Ürün Radar" />
        </Link>
        <div className="flex gap-3 items-center">
          <AuthButton />
          {user ? <ProfileButton /> : null}
        </div>
      </div>
    </nav>
  );
};
