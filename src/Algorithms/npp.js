export const npp = (arrivalTime, burstTime, priorities) => {
  let processes = arrivalTime.map((at, i) => ({
    job: (i + 10).toString(36).toUpperCase(),
    at,
    bt: burstTime[i],
    priority: priorities[i],
  }));

  processes.sort((a, b) => a.at - b.at || a.priority - b.priority);
  let solved = [],
    time = 0,
    queue = [];

  while (processes.length || queue.length) {
    queue.push(...processes.filter((p) => p.at <= time));
    processes = processes.filter((p) => p.at > time);

    if (!queue.length) {
      queue.push(processes.shift());
      time = queue[0].at;
    }

    queue.sort((a, b) => a.priority - b.priority || a.at - b.at);
    let p = queue.shift();

    time = Math.max(time, p.at) + p.bt;
    solved.push({ ...p, ft: time, tat: time - p.at, wat: time - p.at - p.bt });
  }

  return {
    solvedProcesses: solved.sort(
      (a, b) => a.at - b.at || a.job.localeCompare(b.job)
    ),
  };
};
