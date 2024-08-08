import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { inputs } from '../../../actions/inputs.action.js';

export const VariableForm = ({ nameOfAlgo }) => {
  //   const dispatch = useDispatch();

  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [timeQuantum, setTimeQuantum] = useState("");
  const [priorities, setPriority] = useState("");
  const [alertbox, setAlertbox] = useState("");

  const handleArrivalChange = (e) => {
    setArrivalTime(e.target.value);
  };

  const handleBurstChange = (e) => {
    setBurstTime(e.target.value);
  };

  const handleTimeQuantumChange = (e) => {
    setTimeQuantum(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const arrivalTimeArr = arrivalTime
      .trim()
      .split(/\s+/)
      .map((at) => parseInt(at));

    const burstTimeArr = burstTime
      .trim()
      .split(/\s+/)
      .map((bt) => parseInt(bt));

    const timeQuantumInt = parseInt(timeQuantum);

    let prioritiesArr = priorities
      .trim()
      .split(/\s+/)
      .map((priority) => parseInt(priority));

    if (burstTimeArr.includes(0)) {
      setAlertbox("0 burst time is invalid");
      return;
    } else if (arrivalTimeArr.length !== burstTimeArr.length) {
      setAlertbox("Number of arrival times and burst times do not match");
      return;
    } else if (
      arrivalTimeArr.includes(NaN) ||
      burstTimeArr.includes(NaN) ||
      (nameOfAlgo === "RR" && isNaN(timeQuantumInt))
    ) {
      setAlertbox("Please enter only integers");
      return;
    } else if (
      arrivalTimeArr.some((t) => t < 0) ||
      burstTimeArr.some((t) => t < 0)
    ) {
      setAlertbox("Negative numbers are invalid");
      return;
    }

    if (nameOfAlgo === "NPP" || nameOfAlgo === "PP") {
      if (priorities.trim() === "") {
        prioritiesArr = arrivalTimeArr.map(() => 0);
      } else if (
        prioritiesArr.length !== arrivalTimeArr.length ||
        prioritiesArr.length !== burstTimeArr.length
      ) {
        setAlertbox(
          "Arrival times, burst times, and priorities should have equal length"
        );
        return;
      }
    }

    setAlertbox("");
    console.log({
      nameOfAlgo,
      arrivalTimeArr,
      burstTimeArr,
      timeQuantumInt,
      prioritiesArr,
    });
    // dispatch(
    //   inputs(
    //     nameOfAlgo,
    //     arrivalTimeArr,
    //     burstTimeArr,
    //     timeQuantumInt,
    //     prioritiesArr
    //   )
    // );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 " // Adjust spacing and flex direction
    >
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#2c1b1a] mb-2">
          Arrival Time
        </label>
        <input
          type="text"
          placeholder="e.g., 1 4 5 6"
          value={arrivalTime}
          onChange={handleArrivalChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-[#2c1b1a] mb-2">
          Burst Time
        </label>
        <input
          type="text"
          placeholder="e.g., 1 4 5 6"
          value={burstTime}
          onChange={handleBurstChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {nameOfAlgo === "RR" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Quantum
          </label>
          <input
            type="text"
            placeholder="e.g., 3"
            value={timeQuantum}
            onChange={handleTimeQuantumChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      )}

      {(nameOfAlgo === "NPP" || nameOfAlgo === "PP") && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priorities
          </label>
          <input
            type="text"
            placeholder="Lower # = Higher"
            value={priorities}
            onChange={handlePriorityChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      )}

      {alertbox && (
        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 italic rounded-lg">
          {alertbox}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex items-center px-6 py-2 bg-green-500 text-white font-semibold text-sm rounded-lg shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Submit
      </button>
    </form>
  );
};
