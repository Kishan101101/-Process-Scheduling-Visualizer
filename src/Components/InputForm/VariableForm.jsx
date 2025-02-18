import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  inputsRequest,
  inputsSuccess,
  inputsFail,
} from "../../Redux/Inputs.slice";

export const VariableForm = ({ nameOfAlgo }) => {
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [timeQuantum, setTimeQuantum] = useState("");
  const [priorities, setPriority] = useState("");
  const [alertbox, setAlertbox] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(inputsRequest()); // Start loading state

    const arrivalTimeArr = arrivalTime.trim().split(/\s+/).map(Number);
    const burstTimeArr = burstTime.trim().split(/\s+/).map(Number);
    const timeQuantumInt = Number(timeQuantum);

    if (burstTimeArr.includes(0)) {
      setAlertbox("0 burst time is invalid");
      dispatch(inputsFail("0 burst time is invalid"));
      return;
    }
    if (arrivalTimeArr.length !== burstTimeArr.length) {
      setAlertbox("Number of arrival times and burst times do not match");
      dispatch(
        inputsFail("Number of arrival times and burst times do not match")
      );
      return;
    }
    if (
      arrivalTimeArr.some(isNaN) ||
      burstTimeArr.some(isNaN) ||
      (nameOfAlgo === "RR" && isNaN(timeQuantumInt))
    ) {
      setAlertbox("Please enter only integers");
      dispatch(inputsFail("Please enter only integers"));
      return;
    }
    if (arrivalTimeArr.some((t) => t < 0) || burstTimeArr.some((t) => t < 0)) {
      setAlertbox("Negative numbers are invalid");
      dispatch(inputsFail("Negative numbers are invalid"));
      return;
    }

    let prioritiesArr = priorities.trim()
      ? priorities.trim().split(/\s+/).map(Number)
      : arrivalTimeArr.map(() => 0);

    if (
      ["NPP", "PP"].includes(nameOfAlgo) &&
      prioritiesArr.length !== arrivalTimeArr.length
    ) {
      setAlertbox(
        "Arrival times, burst times, and priorities should have equal length"
      );
      dispatch(
        inputsFail(
          "Arrival times, burst times, and priorities should have equal length"
        )
      );
      return;
    }

    setAlertbox("");

    // Dispatch the successful data to Redux store
    dispatch(
      inputsSuccess({
        nameOfAlgo,
        arrivalTime: arrivalTimeArr,
        burstTime: burstTimeArr,
        timeQuantum: timeQuantumInt,
        priority: prioritiesArr,
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-fadeIn duration-500"
    >
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#2c1b1a] mb-2">
          Arrival Time
        </label>
        <input
          type="text"
          placeholder="e.g., 1 4 5 6"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-200 hover:scale-105"
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
          onChange={(e) => setBurstTime(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-200 hover:scale-105"
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
            onChange={(e) => setTimeQuantum(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-200 hover:scale-105"
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
            onChange={(e) => setPriority(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-200 hover:scale-105"
          />
        </div>
      )}

      {alertbox && (
        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 italic rounded-lg animate-slideIn">
          {alertbox}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex items-center px-6 py-2 bg-green-500 text-white font-semibold text-sm rounded-lg shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform duration-200 hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

export default VariableForm;
