import React from "react";
import { motion } from "framer-motion";

const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

const Table = ({ value }) => {
  const solvedProcessesInfo = value || []; // Ensure it's always an array

  const total = (array) =>
    array.reduce((acc, currentValue) => acc + currentValue, 0);

  const numberOfProcesses = solvedProcessesInfo.length || 1; // Prevent division by zero
  const turnAroundTime = solvedProcessesInfo.map((process) => process.tat || 0);
  const waitingTime = solvedProcessesInfo.map((process) => process.wat || 0);

  const totalTAT = total(turnAroundTime);
  const averageTAT = totalTAT / numberOfProcesses;

  const totalWAT = total(waitingTime);
  const averageWAT = totalWAT / numberOfProcesses;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="overflow-x-auto"
    >
      {solvedProcessesInfo.length > 0 ? (
        <table className="w-full text-sm text-left border-collapse border border-gray-400">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-3 border border-gray-400">Job</th>
              <th className="px-4 py-3 border border-gray-400">Arrival Time</th>
              <th className="px-4 py-3 border border-gray-400">Burst Time</th>
              <th className="px-4 py-3 border border-gray-400">Finish Time</th>
              <th className="px-4 py-3 border border-gray-400">
                Turn Around Time
              </th>
              <th className="px-4 py-3 border border-gray-400">Waiting Time</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {solvedProcessesInfo.map((item, index) => (
              <tr
                key={`process-row-${item.job}-${index}`} // Unique key using job and index
                className="hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2 border border-gray-400">{item.job}</td>
                <td className="px-4 py-2 border border-gray-400">{item.at}</td>
                <td className="px-4 py-2 border border-gray-400">{item.bt}</td>
                <td className="px-4 py-2 border border-gray-400">{item.ft}</td>
                <td className="px-4 py-2 border border-gray-400">{item.tat}</td>
                <td className="px-4 py-2 border border-gray-400">{item.wat}</td>
              </tr>
            ))}
            <tr className="bg-gray-200 font-semibold">
              <td
                colSpan={4}
                className="px-4 py-2 text-right border border-gray-400"
              >
                Average
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {totalTAT} / {numberOfProcesses} ={" "}
                {precisionRound(averageTAT, 3)}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {totalWAT} / {numberOfProcesses} ={" "}
                {precisionRound(averageWAT, 3)}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-700">No data available</p>
      )}
    </motion.div>
  );
};

export default Table;
