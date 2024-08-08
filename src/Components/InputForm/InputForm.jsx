import React, { useState } from "react";
import { VariableForm } from "./VariableForm";

const InputForm = () => {
  const [algo, setAlgo] = useState("FCFS");

  const handleChange = (e) => {
    setAlgo(e.target.value);
  };

  return (
    <div className="flex items-start min-h-screen bg-[#b6f8e1a9] justify-center p-2  ">
      <div className="bg-[#514f4fca] p-8 m-5 rounded-3xl shadow-2xl shadow-black w-full max-w-screen-lg border border-gray-300">
        <h2 className="text-3xl font-serif mb-8 text-gray-900">
          Processes Inputs
        </h2>

        {/* Move the form from here to VariableForm */}
        <div className="space-y-6">
          <div className="mb-6">
            <label
              htmlFor="algorithm"
              className="block text-sm font-bold text-[#2c1b1a] mb-2"
            >
              Algorithm
            </label>
            <select
              id="algorithm"
              value={algo}
              onChange={handleChange}
              className="block w-fit border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="FCFS">First Come First Serve (FCFS)</option>
              <option value="SJF">
                Shortest Job First (SJF) (Non Preemptive)
              </option>
              <option value="SRTF">Shortest Remaining Time First (SRTF)</option>
              <option value="RR">Round Robin (RR)</option>
              <option value="NPP">Priority Non-Preemptive (NPP)</option>
              <option value="PP">Priority Preemptive (PP)</option>
            </select>
          </div>
          <VariableForm nameOfAlgo={algo} />
        </div>
      </div>
    </div>
  );
};

export default InputForm;
