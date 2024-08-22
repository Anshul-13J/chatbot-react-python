const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

ipcMain.on('chat-message', (event, prompt) => {
    const python = spawn('python', [path.join(__dirname, 'script.py'), prompt]);

    python.stdout.on('data', (data) => {
        const result = JSON.parse(data);
        event.sender.send('chat-reply', result.response);
    });

    python.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    python.on('close', (code) => {
        console.log(`Python script finished with code ${code}`);
    });
});
