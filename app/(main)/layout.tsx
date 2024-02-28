import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-center min-h-screen w-full bg-purple-100">
      <div className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
        <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
