'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

// Quit when all windows are closed
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// When ready, start the browser window
app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 1300, height: 980});
    mainWindow.loadURL('file://' + __dirname + '/menu.html');
    mainWindow.toggleDevTools();         
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
