// services/pythonRunner.js
const { spawn } = require('child_process');

const runPythonScript = (scriptPath, input) => {
  return new Promise((resolve, reject) => {
    const process = spawn('python3', [scriptPath]);

    let output = '';
    let error = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      error += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(output));
        } catch (err) {
          reject(new Error('Failed to parse JSON: ' + err.message));
        }
      } else {
        reject(new Error(error));
      }
    });

    // Send input to stdin
    if (typeof input === 'object') {
      process.stdin.write(JSON.stringify(input));
    } else {
      process.stdin.write(input.toString());
    }
    process.stdin.end();
  });
};

module.exports = runPythonScript;
