// components/layout.tsx
import { ReactNode } from "react";
import Head from "next/head";



interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="navbar bg-sky-600 text-white shadow-sm">
        <div className="navbar-start">

        </div>
        <div className="navbar-center grid justify-center items-center text-center">
          <a href="/" className="btn btn-ghost text-xl">Moviesda</a>
          <span className="text-md">Name of Quality</span>

        </div>
        <div className="navbar-end">

        </div>
      </div>


      <main>{children}</main>
    </>
  );
}
