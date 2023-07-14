import Footer from "./footer";
import Header from "./header";
import { useEffect } from "react";
import WOW from "wowjs";
import About from "../Section/aboutUsSection";
import Apply from "../Section/applyProcessSection";
import Client from "../Section/clientLogoSection";
import Breadcrumbs from "../Section/breadcrumbsSection";

function AboutUs() {
  
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Breadcrumbs title="About Us" />
      <About />
      <Apply />
      <Client />
      <Footer />
    </>
  );
}
export default AboutUs;
