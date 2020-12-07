console.log('Starting');
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
require('electron-reload')(__dirname);

var win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    win.loadFile('./login.html');
    //win.webContents.openDevTools();
}

app.on('ready', createWindow);

ipcMain.on('load_file', (event, arg) => {
    if (fs.existsSync(__dirname + '\\' + arg)) {
        win.loadFile(__dirname + '\\' + arg);
    } else {
        win.webContents.send('console_log', `File \'${arg}\' does not exist!`);
    }
});