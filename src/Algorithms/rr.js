export const rr = (arrivalTime, burstTime, timeQuantum) => {
  let processes = arrivalTime.map((at, i) => ({
    job: (i + 10).toString(36).toUpperCase(),
    at,
    bt: burstTime[i],
  }));

  processes.sort((a, b) => a.at - b.at);
  let remaining = Object.fromEntries(processes.map((p) => [p.job, p.bt]));
  let queue = [processes[0]],
    solved = [],
    time = processes[0].at;

  while (queue.length || processes.some((p) => remaining[p.job] > 0)) {
    if (!queue.length) {
      queue.push(processes.find((p) => remaining[p.job] > 0));
      time = queue[0].at;
    }

    let p = queue.shift(),
      executeTime = Math.min(remaining[p.job], timeQuantum);
    (remaining[p.job] -= executeTime), (time += executeTime);

    processes
      .filter((n) => n.at <= time && remaining[n.job] > 0 && !queue.includes(n))
      .forEach((n) => queue.push(n));
    if (remaining[p.job] > 0) queue.push(p);
    else
      solved.push({
        ...p,
        ft: time,
        tat: time - p.at,
        wat: time - p.at - p.bt,
      });
  }

  return {
    solvedProcessesInfo: solved.sort(
      (a, b) => a.at - b.at || a.job.localeCompare(b.job)
    ),
  };
};
