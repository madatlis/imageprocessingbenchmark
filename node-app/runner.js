"use strict";

const pusage = require('pidusage');
const ps = require('ps-node');

let intervals = {};
let pids = {};

let calls = [{
    'primary': 'php',
    'primary_arg': ['image-gd.php'],
    'secondary': null
  },{
    'primary': 'php',
    'primary_arg': ['image-im.php'],
    'secondary': 'convert'
  },
  {
    'primary': 'php',
    'primary_arg': ['image-gm.php'],
    'secondary': 'gm'
  }];

callProcess(calls, 0);

function callProcess(calls, i) {
  if (calls[i]) {
    fireChildProcess(calls[i], function() {
      callProcess(calls, i + 1);
    });
  } else {
    // cleanup.
    for (var interval in intervals) {
      clearInterval(interval);
    }
  }
}

function fireChildProcess(call, cb) {
  const spawn = require('child_process').spawn;
  const childProcess = spawn(call.primary, call.primary_arg);

  findProcess(call.primary);

  childProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  childProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  childProcess.on('close', (code) => {
    clearInterval(intervals[call.primary]);
    clearInterval(intervals[call.secondary]);
    cb();
  });
}

function findProcess(command) {
  console.log("find process", command);
  ps.lookup({
    command: command
  }, function(err, resultList ) {
    if (err) {
      throw new Error( err );
    }

    resultList.forEach(function(process) {
      console.log("results", command, process);
      if( process ){
        pids[process.pid] = command;
        intervals[command] = setInterval(function() {
          checkMemory(process.pid);
        }, 250);
      }
    });
  });
}

function checkMemory(pid) {
  pusage.stat(pid, function(err, stat) {
    if (!err) {
      console.log(`Command: ${pids[pid]} - Pcpu: ${stat.cpu} Mem: ${bytes2Megabytes(stat.memory)}`);
    }
  });

  // Unmonitor process
  pusage.unmonitor(pid);
}

function bytes2Megabytes(bytes) {
  return Math.floor((bytes / 1048576) * 100) / 100;
}