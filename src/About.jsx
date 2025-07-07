// About component
import React from "react";

function About() {
  return (
    <div className="flex" style={{ backgroundColor: "#1e1b4b" }}>
      <div className="flex-1 p-6 pr-20">
        {" "}
        {/* Added pr-20 for padding-right */}
        {/* Add Image */}
        <div className="flex justify-center mb-4">
          <img
            src="http://localhost:8080/images/img1.jpg" // Replace with your image URL
            alt="Meals"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        </div>
        <div>
          <h1
            className="text-4xl font-bold font-shadow-2xl text-amber-500 text-center mb-6 shadow-lg "
            style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
          >
            About Bharat Lunch
          </h1>
        </div>
        <div
          className="text-white text-lg"
          style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}
        >
          <p>
            Bharat Lunch is a premier food delivery service that brings the best
            of Indian cuisine to your doorstep.
          </p>
          <p>
            Our mission is to provide delicious, authentic meals made from the
            freshest ingredients, all while ensuring a seamless and enjoyable
            ordering experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
