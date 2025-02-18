export const fcfs = (arrivalTime, burstTime) => {
  const processes = arrivalTime
    .map((at, index) => ({
      job: String.fromCharCode(65 + index), // Naming jobs as A, B, C, ...
      at,
      bt: burstTime[index],
    }))
    .sort((a, b) => a.at - b.at); // Sorting by arrival time

  let finishTime = 0;
  const solvedProcesses = processes.map((process) => {
    finishTime = Math.max(finishTime, process.at) + process.bt;

    return {
      ...process,
      ft: finishTime,
      tat: finishTime - process.at, // Turnaround Time
      wat: finishTime - process.at - process.bt, // Waiting Time
    };
  });

  return { solvedProcesses };
};
