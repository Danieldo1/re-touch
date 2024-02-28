import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      {children}
    </main>
  );
};

export default Layout;
