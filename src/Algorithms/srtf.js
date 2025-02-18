export const srtf = (arrivalTime, burstTime) => {
  let processes = arrivalTime.map((at, i) => ({
    job: String.fromCharCode(65 + i), // Naming as A, B, C...
    at,
    bt: burstTime[i],
    rt: burstTime[i], // Remaining time
    st: -1, // Start time for first execution
  }));

  // Sort initially by arrival time
  processes.sort((a, b) => a.at - b.at);

  let currentTime = 0,
    completed = 0,
    n = processes.length;
  let solved = [];

  while (completed < n) {
    let availableProcesses = processes
      .filter((p) => p.at <= currentTime && p.rt > 0)
      .sort((a, b) => a.rt - b.rt || a.at - b.at); // Sort by shortest remaining time

    if (!availableProcesses.length) {
      currentTime = Math.min(
        ...processes.filter((p) => p.rt > 0).map((p) => p.at)
      );
      continue;
    }

    let currentProcess = availableProcesses[0]; // Pick the shortest job
    if (currentProcess.st === -1) currentProcess.st = currentTime; // Set start time first time it runs
    currentProcess.rt--; // Reduce remaining time
    currentTime++;

    if (currentProcess.rt === 0) {
      completed++;
      let ft = currentTime;
      solved.push({
        ...currentProcess,
        ft,
        tat: ft - currentProcess.at, // Turnaround Time
        wat: ft - currentProcess.at - currentProcess.bt, // Waiting Time
      });
    }
  }

  // Ensure final output is sorted by arrival time
  solved.sort((a, b) => a.at - b.at);

  return { solvedProcesses: solved };
};
