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

     createMessage("Ya yeet");
     createMessage("what");
     createMessage("is good");
     createMessage("makin some elements");
     createMessage("with js");
     createMessage("Ya yeet");
     createMessage("what");
     createMessage("is good");
     createMessage("makin some elements");
     createMessage("with js");
     createMessage("Ya yeet");
     createMessage("what");
     createMessage("is good");
     createMessage("makin some elements");
     createMessage("with js");

     var u = document.getElementById('message-list');
     u.scrollTop = Number.MAX_SAFE_INTEGER;

     document.getElementById('compose-form').addEventListener('submit', event => {
          event.preventDefault();
          let message = document.getElementById('compose-field').value;
          console.log(message);
     });

}

// When HTML loads, function runs.
document.onreadystatechange = function () {
     if (document.readyState == "complete") {
          initalise();
     }
};

function createMessage(content) {
     var template = document.getElementById('message-template');
     var clone = template.content.cloneNode(true);
     clone.querySelector("p").innerHTML = content;
     document.getElementById('message-list').appendChild(clone);
}