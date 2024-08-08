import React from "react";
import InputForm from "../Components/InputForm/InputForm.jsx";

const Home = () => {
  return (
    <div>
      <header className="bg-gray-800 text-[#e5e0c8] py-4">
        <h1 className="font-serif font-bold text-center sm:text-4xl text-2xl">
          CPU Scheduling Algo Visulizer
        </h1>
      </header>
      <InputForm />
    </div>
  );
};

export default Home;
