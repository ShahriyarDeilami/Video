import Link from "next/link";
import Avatar from "@/components/Avatar";
import { useState, useEffect } from 'react';
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
const Header = ({}) => {  
const user = useUser();
  return (
    <header
      style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "spaceBetween",
        padding: "16px",
        position: "sticky",
        top: "0",
        zIndex: "10",
        transition: "height 0.3s",
      }}
    >
      <Link href="/account"></Link>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/browse">Browse</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
