const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  runAction: (action) => ipcRenderer.invoke("run-action", action),
  openDebug: () => ipcRenderer.invoke("open-debug"),
  quitApp: () => ipcRenderer.invoke("quit-app"),
  getLaunchAtStartup: () => ipcRenderer.invoke("get-launch-at-startup"),
  setLaunchAtStartup: (enabled) => ipcRenderer.invoke("set-launch-at-startup", enabled),
  exportProfileData: (payload) => ipcRenderer.invoke("export-profile-data", payload),
  importProfileData: () => ipcRenderer.invoke("import-profile-data"),
});
