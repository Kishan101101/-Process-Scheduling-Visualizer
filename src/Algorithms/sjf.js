export const sjf = (arrivalTime, burstTime) => {
  let processes = arrivalTime
    .map((at, i) => ({
      job: String.fromCharCode(65 + i),
      at,
      bt: burstTime[i],
    }))
    .sort((a, b) => a.at - b.at);

  let time = 0,
    solved = [],
    readyQueue = [],
    remainingProcesses = [...processes];

  while (remainingProcesses.length || readyQueue.length) {
    readyQueue.push(...remainingProcesses.filter((p) => p.at <= time));
    remainingProcesses = remainingProcesses.filter((p) => p.at > time);
    readyQueue.sort((a, b) => a.bt - b.bt || a.at - b.at);

    if (!readyQueue.length) {
      time = remainingProcesses[0].at;
      continue;
    }

    let p = readyQueue.shift();
    let ft = time + p.bt;
    solved.push({ ...p, ft, tat: ft - p.at, wat: ft - p.at - p.bt });
    time = ft;
  }
  solved.sort((a, b) => a.at - b.at);

  return { solvedProcesses: solved };
};
