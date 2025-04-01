
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${fullWidth ? "" : "container mx-auto px-4 py-8"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
