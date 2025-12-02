#!/usr/bin/env node

const os = require('os');
const blessed = require('blessed');
const contrib = require('blessed-contrib');

// helper: CPU usage sampling
function cpuTimes() {
  const cpus = os.cpus();
  const res = cpus.map(cpu => {
    const t = cpu.times;
    const total = t.user + t.nice + t.sys + t.idle + t.irq;
    return { idle: t.idle, total };
  });
  const idle = res.reduce((s, r) => s + r.idle, 0);
  const total = res.reduce((s, r) => s + r.total, 0);
  return { idle, total };
}

let prev = cpuTimes();

function cpuLoadPercent() {
  const cur = cpuTimes();
  const idleDiff = cur.idle - prev.idle;
  const totalDiff = cur.total - prev.total;
  prev = cur;
  const usage = 1 - idleDiff / totalDiff;
  return Math.max(0, Math.min(1, usage)) * 100;
}

// Create screen
const screen = blessed.screen({ smartCSR: true, title: 'termvibe' });
const grid = new contrib.grid({ rows: 12, cols: 12, screen });

// Widgets
const cpuGauge = grid.set(0, 0, 4, 6, contrib.gauge, {
  label: 'CPU %',
  stroke: 'green',
  fill: 'white'
});

const memGauge = grid.set(0, 6, 4, 6, contrib.gauge, {
  label: 'Memory %',
  stroke: 'magenta',
  fill: 'white'
});

const line = grid.set(4, 0, 8, 12, contrib.line, {
  label: 'CPU Load (last 60s)',
  showLegend: true,
  minY: 0,
  maxY: 100,
  wholeNumbersOnly: false,
  style: { line: 'yellow', text: 'white', baseline: 'black' }
});

// Data store
const maxPoints = 60;
const cpuHistory = Array(maxPoints).fill(0);
const xLabels = Array.from({length: maxPoints}, (_,i) => `${i - maxPoints + 1}`);

// Render function
function update() {
  const cpu = cpuLoadPercent();
  const free = os.freemem();
  const total = os.totalmem();
  const usedPct = ((total - free) / total) * 100;

  cpuHistory.shift();
  cpuHistory.push(Math.round(cpu * 10) / 10);

  cpuGauge.setData([ Math.round(cpu) ]);
  memGauge.setData([ Math.round(usedPct) ]);

  line.setData([{
    title: 'CPU',
    x: xLabels,
    y: cpuHistory
  }]);

  screen.render();
}

// Key bindings
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.key(['r'], () => {
  // reset
  for (let i = 0; i < cpuHistory.length; i++) cpuHistory[i] = 0;
});

// Start interval
update();
setInterval(update, 1000);
