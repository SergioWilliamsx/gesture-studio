const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  runAction: (action) => ipcRenderer.invoke("run-action", action),
});
