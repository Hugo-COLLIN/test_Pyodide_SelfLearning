import {loadPyodide} from "pyodide";

async function main() {
  return await loadPyodide({
    indexURL : "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/"
  });
}
let pyodideReadyPromise = main();

async function evaluatePython() {
  let pyodide = await pyodideReadyPromise;
  try {
    pyodide.runPython(`
          import io
          sys.stdout = io.StringIO()
        `);
    let result = pyodide.runPython(editor.getValue());
    let stdout = pyodide.runPython("sys.stdout.getvalue()");
    addToOutput(stdout);
  } catch (err) {
    addToOutput(err);
  }
}