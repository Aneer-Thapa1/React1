import React from "react";
import Navbar from "./Navbar";
import Contact from "./Contact";

const Home = () => {
  const style = {
    backgroundColor: "red",
  };
  return (
    <>
      <Navbar />
      <div>
        <h1 style={style}>Home Page</h1>
        Hello Everyone this is our homepage
      </div>
      <Contact />
    </>
  );
};

export default Home;
