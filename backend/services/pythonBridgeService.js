const { spawn } = require('child_process');
const path = require('path');

// Function to run a Python script with provided arguments
const runPythonScript = (script, args = []) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../nlp', script);

    const py = spawn('python', [scriptPath, ...args]);

    let data = '';
    let error = '';

    py.stdout.on('data', chunk => {
      data += chunk.toString();
    });

    py.stderr.on('data', chunk => {
      error += chunk.toString();
    });

    py.on('close', code => {
      if (code !== 0) {
        return reject(new Error(`Python script failed with code ${code}: ${error}`));
      }

      try {
        const parsed = JSON.parse(data); // ✅ Parse JSON from Python
        resolve(parsed);
      } catch (e) {
        reject(new Error(`Failed to parse JSON from Python: ${e.message}`));
      }
    });
  });
};

const extractTextFromPDF = (filePath) => {
  return runPythonScript('process_pdf.py', [filePath, 'extract']); // Make sure task is passed
};

module.exports = { extractTextFromPDF };
