const { BrowserWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');

const serverURL = 'http://localhost:8000';

let defaultInputCss;

function initalise() {
     // Get default shadow colour
     var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
     for (var x = 0; x < classes.length; x++) {
          if (classes[x].selectorText == 'input') {
               defaultInputCss = /box-shadow:\s?(.{0,30})\;/.exec(classes[x].cssText || classes[x].style.cssText)[1];
          }
     }

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

     document.getElementById('login-form').addEventListener('submit', event => {
          event.preventDefault();
          let usernameField = document.getElementById('username');
          let passwordField = document.getElementById('password');
          usernameField.style.boxShadow = defaultInputCss;
          passwordField.style.boxShadow = defaultInputCss;
          loginRequest(usernameField.value, passwordField.value).then(data => {
               console.log(data)
               if (!data.user) {
                    if (data.errors.username) {
                         usernameField.style.boxShadow = "3px 6px #AA0000";
                    } else {
                         passwordField.style.boxShadow = "3px 6px #AA0000";
                    }
               } else if (data.user.token) {
                    ipcRenderer.send('load_file', 'index.html')
               }
          });
     });

     ipcRenderer.on('console_log', (event, arg) => {
          console.log(arg);
     });
}

async function loginRequest(u, p) {
     let credentials = {
          user: {
               username: u,
               password: p
          }
     };

     const response = await fetch(serverURL + '/api/users/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
     });

     return response.json();
}

// When HTML loads, function runs.
document.onreadystatechange = function () {
     if (document.readyState == "complete") {
          initalise();
     }
}; 1