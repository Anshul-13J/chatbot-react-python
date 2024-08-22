const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    sendMessage: (prompt) => ipcRenderer.send('chat-message', prompt),
    onReply: (callback) => ipcRenderer.on('chat-reply', (event, response) => callback(response)),
});
