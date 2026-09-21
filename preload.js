const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('kvaltikAPI', {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
  listPlugins: () => ipcRenderer.invoke('plugins:list'),
  openExternal: (url) => ipcRenderer.invoke('external:open', url)
});
