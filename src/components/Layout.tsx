import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JSX } from "react";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
