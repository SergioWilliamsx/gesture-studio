const { app, BrowserWindow, ipcMain, session, Tray, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const { execFile } = require("child_process");

const isDev = !app.isPackaged;

// AutoHotkey embutido (copiado pelo extraResources)
const BUNDLED_AHK_EXE = isDev
  ? path.join(__dirname, "vendor", "ahk", "AutoHotkey.exe")
  : path.join(process.resourcesPath, "ahk", "AutoHotkey.exe");

// fallback caso o usuário tenha instalado (se o embutido não existir por algum motivo)
const SYSTEM_AHK_EXE = "C:\\Program Files\\AutoHotkey\\v2\\AutoHotkey.exe";

function getAhkExePath() {
  if (fs.existsSync(BUNDLED_AHK_EXE)) return BUNDLED_AHK_EXE;
  return SYSTEM_AHK_EXE;
}

// actions.ahk também vai pra resources
const AHK_ACTIONS = isDev
  ? path.join(__dirname, "actions.ahk")
  : path.join(process.resourcesPath, "actions.ahk");

const ICON_PATH = path.join(__dirname, "icon.ico");

let win;
let tray;

let lastRunAt = 0;
const COOLDOWN_MS = 120; // renderer já controla; aqui é só uma proteção leve

function runAhkAction(action) {
  const cmd = String(action || "").trim();
  if (!cmd) return;

  const ahkExe = getAhkExePath();

  execFile(ahkExe, [AHK_ACTIONS, cmd], (err) => {
    if (err) console.error("Erro AHK:", err.message);
  });
}

/* =========================
   IPC (Renderer -> Main)
   window.api.runAction("vol_down")
========================= */
ipcMain.handle("run-action", (_evt, action) => {
  const now = Date.now();
  if (now - lastRunAt < COOLDOWN_MS) return { ok: true, skipped: true };

  lastRunAt = now;
  runAhkAction(action);
  return { ok: true, skipped: false };
});

/* =========================
   Tray
========================= */
function createTray() {
  tray = new Tray(ICON_PATH);

  const menu = Menu.buildFromTemplate([
    {
      label: "Mostrar",
      click: () => {
        win.show();
        win.focus();
      },
    },
    {
      label: "Ocultar",
      click: () => win.hide(),
    },
    { type: "separator" },
    {
      label: "Sair",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Gesture Studio (rodando)");
  tray.setContextMenu(menu);

  tray.on("double-click", () => {
    if (win.isVisible()) win.hide();
    else {
      win.show();
      win.focus();
    }
  });
}

/* =========================
   Window
========================= */
function createWindow() {
  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    width: 980,
    height: 720,
    autoHideMenuBar: true,
    icon: ICON_PATH,
    show: true,
    backgroundColor: "#0f1115",

    // barra custom
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#0f1115",       // cor da barra
      symbolColor: "#cfd6e4", // cor dos ícones (min/max/close)
      height: 34,             // altura (parecida com seu print)
    },

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, "renderer", "index.html"));

  win.on("close", (e) => {
    if (!app.isQuiting) {
      e.preventDefault();
      win.hide();
    }
  });

  win.on("minimize", (e) => {
    e.preventDefault();
    win.hide();
  });
}

/* =========================
   App lifecycle
========================= */
app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_wc, permission, cb) => {
    if (permission === "media") return cb(true);
    cb(false);
  });

  createWindow();
  createTray();
});

app.on("window-all-closed", (e) => {
  // não encerra quando a janela some (tray continua)
  e.preventDefault();
});
