import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <main className="auth">{children}</main>;
}

export default Layout;
