export const pp = (arrivalTime, burstTime, priority) => {
  let processes = arrivalTime.map((at, i) => ({
    job: (i + 10).toString(36).toUpperCase(),
    at,
    bt: burstTime[i],
    priority: priority[i],
  }));

  processes.sort((a, b) => a.at - b.at || a.priority - b.priority);
  let solved = [],
    readyQueue = [],
    remainingTime = Object.fromEntries(processes.map((p) => [p.job, p.bt]));
  let currentTime = processes[0].at,
    unfinishedJobs = [...processes];

  while (unfinishedJobs.length) {
    readyQueue.push(
      ...unfinishedJobs.filter(
        (p) => p.at <= currentTime && !readyQueue.includes(p)
      )
    );
    readyQueue.sort((a, b) => a.priority - b.priority || a.at - b.at);

    if (!readyQueue.length) {
      currentTime = unfinishedJobs[0].at;
      continue;
    }

    let p = readyQueue.shift();
    let nextProcess = unfinishedJobs.find(
      (n) =>
        n.at > currentTime &&
        n.at < currentTime + remainingTime[p.job] &&
        n.priority < p.priority
    );
    let executionTime = nextProcess
      ? nextProcess.at - currentTime
      : remainingTime[p.job];

    remainingTime[p.job] -= executionTime;
    currentTime += executionTime;

    if (remainingTime[p.job] === 0) {
      unfinishedJobs = unfinishedJobs.filter((j) => j.job !== p.job);
      solved.push({
        ...p,
        ft: currentTime,
        tat: currentTime - p.at,
        wat: currentTime - p.at - p.bt,
      });
    } else {
      readyQueue.push(p);
    }
  }

  return {
    solvedProcesses: solved.sort(
      (a, b) => a.at - b.at || a.job.localeCompare(b.job)
    ),
  };
};
