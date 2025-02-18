import React, { useState } from "react";
import { motion } from "framer-motion";
import VariableForm from "./VariableForm";

const InputForm = () => {
  const [algo, setAlgo] = useState("FCFS");

  return (
    <div className="flex items-center min-h-screen bg-gradient-to-r from-green-200 to-blue-300 justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/30 backdrop-blur-lg p-10 m-5 rounded-3xl shadow-2xl shadow-black w-full max-w-2xl border border-gray-200"
      >
        <h2 className="text-4xl font-serif font-semibold mb-8 text-gray-800 text-center">
          Processes Inputs
        </h2>

        <div className="space-y-6">
          {/* Algorithm Selection */}
          <div className="mb-6">
            <label
              htmlFor="algorithm"
              className="block text-lg font-bold text-gray-900 mb-2"
            >
              Select Algorithm
            </label>
            <select
              id="algorithm"
              value={algo}
              onChange={(e) => setAlgo(e.target.value)}
              className="block w-full border border-gray-300 rounded-xl shadow-sm bg-gray-100 focus:ring-blue-500 focus:border-blue-500 text-lg p-2 transition-transform duration-300 hover:scale-105"
            >
              <option value="FCFS">First Come First Serve (FCFS)</option>
              <option value="SJF">
                Shortest Job First (SJF) - Non-Preemptive
              </option>
              <option value="SRTF">Shortest Remaining Time First (SRTF)</option>
              <option value="RR">Round Robin (RR)</option>
              <option value="NPP">Priority Non-Preemptive (NPP)</option>
              <option value="PP">Priority Preemptive (PP)</option>
            </select>
          </div>

          {/* Variable Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <VariableForm nameOfAlgo={algo} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default InputForm;
