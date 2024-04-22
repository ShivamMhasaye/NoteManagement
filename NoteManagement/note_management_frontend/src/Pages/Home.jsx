import React from "react";
import HomeNavbar from "../Components/HomeNavbar";
import MainContent from "../Components/MainContent";
import Footer from "../Components/Footer";
import "../Style/App.css";

export default function Home() {
  return (
    <>
      <div>
        <header>
          <HomeNavbar />
        </header>
        <section>
          <MainContent />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
