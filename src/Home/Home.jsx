import React from "react";
import InputForm from "../Components/InputForm/InputForm.jsx";
import Output from "../Components/Output/Output.jsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
      {/* Header */}
      <header className="bg-gray-800 text-[#e5e0c8] py-4 shadow-lg">
        <h1 className="font-serif font-bold text-center sm:text-4xl text-2xl">
          CPU Scheduling Algorithm Visualizer
        </h1>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="w-full">
            <InputForm />
          </div>

          {/* Output */}
          <div className="w-full">
            <Output />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
