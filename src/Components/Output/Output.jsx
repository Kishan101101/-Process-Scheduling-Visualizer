import React from "react";
import { useSelector } from "react-redux";
import { Algo } from "../../Algorithms/Algo";
import Table from "./Table";
import { motion } from "framer-motion";

const Output = () => {
  const { nameOfAlgo, arrivalTime, burstTime, timeQuantum, priority } =
    useSelector((store) => store.inputs);

  if (!arrivalTime.length || !burstTime.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-10 p-8 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl shadow-black border border-gray-200 text-center text-gray-900 w-full max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-semibold">Output</h2>
        <p className="text-lg mt-2">Table will be shown here...</p>
      </motion.div>
    );
  } else {
    const result = Algo(
      nameOfAlgo,
      arrivalTime,
      burstTime,
      timeQuantum,
      priority
    );
    console.log(result);
    const { solvedProcesses } = result || {};

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 p-8 bg-gradient-to-r from-green-200 to-blue-300 rounded-2xl shadow-2xl text-gray-900 w-full max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center">Output</h2>
        <p className="mt-3 text-lg text-center">
          You chose <span className="font-semibold">{nameOfAlgo}</span> CPU
          Scheduling Algorithm
        </p>
        <div className="mt-6">
          <Table value={solvedProcesses} />
        </div>
      </motion.div>
    );
  }
};

export default Output;
