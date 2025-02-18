export const rr = (arrivalTime, burstTime, timeQuantum) => {
  let n = arrivalTime.length;
  let remaining = [...burstTime]; // Remaining burst time
  let wt = new Array(n).fill(0); // Waiting time array
  let tat = new Array(n).fill(0); // Turnaround time array
  let time = 0; // Current time

  while (true) {
    let done = true;

    for (let i = 0; i < n; i++) {
      if (remaining[i] > 0) {
        done = false; // There is a pending process

        if (remaining[i] > timeQuantum) {
          time += timeQuantum;
          remaining[i] -= timeQuantum;
        } else {
          time += remaining[i];
          wt[i] = time - burstTime[i] - arrivalTime[i]; // Waiting time calculation
          remaining[i] = 0;
        }
      }
    }

    if (done) break;
  }

  for (let i = 0; i < n; i++) {
    tat[i] = burstTime[i] + wt[i]; // Turnaround Time = Burst Time + Waiting Time
  }

  let totalWT = wt.reduce((a, b) => a + b, 0);
  let totalTAT = tat.reduce((a, b) => a + b, 0);

  let solved = arrivalTime.map((at, i) => ({
    job: (i + 10).toString(36).toUpperCase(), // Naming Jobs A, B, C...
    at,
    bt: burstTime[i],
    ft: tat[i] + at, // Finish Time
    tat: tat[i],
    wat: wt[i],
  }));

  solved.sort((a, b) => a.at - b.at || a.job.localeCompare(b.job));

  return {
    solvedProcesses: solved,
  };
};
