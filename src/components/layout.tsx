// components/layout.tsx
import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
            {/* Logo and Site Name */}
            <div className="flex items-center mb-4 md:mb-0 md:flex-none">
              <Link href="/" className="flex items-center">
                <div className="flex items-center space-x-2">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-12 h-12 object-cover"
                  />
                  <span className="text-lg font-bold text-gray-800">Moviesda</span>
                </div>
              </Link>
            </div>

            {/* Menu */}
            <nav className="flex-grow mb-4 md:mb-0">
              <ul className="flex flex-wrap justify-center space-x-1 md:space-x-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-[#2a6496] font-medium text-sm md:text-base px-2"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-gray-700 hover:text-[#2a6496] font-medium text-sm md:text-base px-2"
                  >
                    Categories
                  </Link>
                </li>

              </ul>
            </nav>

            {/* Search */}
            <div className="flex items-center justify-center w-full md:w-auto md:flex-none">
              <form className="flex-grow max-w-xs">
                <input
                  placeholder="Search"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2a6496]"
                  type="text"
                  value=""
                />
              </form>
              <Link
                href="/login"
                className="ml-2 bg-[#2a6496] hover:bg-[#1e4b73] text-white px-4 py-2 rounded text-sm md:text-base"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="container p-10 mx-auto min-h-screen max-h-full border-x border-x-zinc-300 dark:border-x-zinc-600">
        {children}
      </main>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Moviesda</p>
        </aside>
      </footer>
    </>
  );
}