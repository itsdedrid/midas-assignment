const portals = [
  { location: 55, destination: 38 },
  { location: 14, destination: 35 },
  { location: 91, destination: 48 },
  { location: 30, destination: 8 },
  { location: 31, destination: 70 },
  { location: 63, destination: 83 },
  { location: 3, destination: 39 },
  { location: 47, destination: 86 },
  { location: 71, destination: 93 },
  { location: 21, destination: 4 },
  { location: 44, destination: 65 },
  { location: 96, destination: 66 },
  { location: 79, destination: 42 },
  { location: 87, destination: 54 },
  { location: 90, destination: 119 },
  { location: 120, destination: 149 },
  { location: 150, destination: 179 },
  { location: 180, destination: 200 },
];

function quickestPath({ portals }) {
  const maxBlock = 200;
  const visited = new Array(maxBlock + 1).fill(false);
  const portalMap = new Map();

  for (const { location, destination } of portals) {
    portalMap.set(location, destination);
  }

  const queue = [{
    position: 1,
    turns: 0,
    path: [[1]]
  }];
  visited[1] = true;

  while (queue.length > 0) {
    const { position, turns, path } = queue.shift();
    for (let step = 1; step <= 11; step++) {
      let walkTo = position + step;
      if (walkTo > maxBlock) 
        continue;
      let currentTurn = [position + 1, ...Array.from({ length: step - 1 }, (_, i) => position + 2 + i)];
      if (portalMap.has(walkTo)) {
        const dest = portalMap.get(walkTo);
        if (dest === maxBlock) {
          return {
            turns: turns + 1,
            turnDetails: [...path, [...currentTurn, walkTo, `[Portal to ${dest}]`]]
          };
        }
        if (!visited[dest]) {
          visited[dest] = true;
          queue.push({
            position: dest,
            turns: turns + 1,
            path: [...path, [...currentTurn, walkTo, `[Portal to ${dest}]`]]
          });
        }
      } else {
        if (walkTo === maxBlock) {
          return {
            turns: turns + 1,
            turnDetails: [...path, [...currentTurn, walkTo]]
          };
        }
        if (!visited[walkTo]) {
          visited[walkTo] = true;
          queue.push({
            position: walkTo,
            turns: turns + 1,
            path: [...path, [...currentTurn, walkTo]]
          });
        }
      }
    }
  }
  return { turns: -1, turnDetails: [] };
}

const result = quickestPath({ portals });
console.log(`Minimum turns: ${result.turns}`);
result.turnDetails.forEach((turn, index) => {
  console.log(`Turn ${index + 1}: ${turn.join(" -> ")}`);
});