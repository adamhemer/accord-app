const { BrowserWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');

const serverURL = 'http://localhost:8000';

function initalise() {
     // Frame [- + x] buttons
     document.getElementById("min-btn").addEventListener("click", function (e) {
          var window = BrowserWindow.getFocusedWindow();
          window.minimize();
     });

     document.getElementById("max-btn").addEventListener("click", function (e) {
          var window = BrowserWindow.getFocusedWindow();
          window.maximize();
     });

     document.getElementById("close-btn").addEventListener("click", function (e) {
          var window = BrowserWindow.getFocusedWindow();
          window.close();
     });

     ipcRenderer.on('console_log', (event, arg) => {
          console.log(arg);
     });
}

// When HTML loads, function runs.
document.onreadystatechange = function () {
     if (document.readyState == "complete") {
          initalise();
     }
}; 1