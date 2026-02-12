const { app, BrowserWindow, ipcMain, session, Tray, Menu, dialog } = require("electron");
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

const HOTKEY_MODIFIERS = ["CTRL", "ALT", "SHIFT", "WIN"];
const HOTKEY_MODIFIER_SET = new Set(HOTKEY_MODIFIERS);
const HOTKEY_MEDIA_KEYS = new Set([
  "VOLUME_UP",
  "VOLUME_DOWN",
  "VOLUME_MUTE",
  "MEDIA_PLAY_PAUSE",
  "MEDIA_NEXT",
  "MEDIA_PREV",
]);
const HOTKEY_KEY_ALIASES = {
  CONTROL: "CTRL",
  CTRL: "CTRL",
  ALT: "ALT",
  SHIFT: "SHIFT",
  META: "WIN",
  WINDOWS: "WIN",
  OS: "WIN",
  CMD: "WIN",
  COMMAND: "WIN",
  WIN: "WIN",
  ESCAPE: "ESC",
  RETURN: "ENTER",
  SPACEBAR: "SPACE",
  " ": "SPACE",
  ARROWUP: "UP",
  ARROWDOWN: "DOWN",
  ARROWLEFT: "LEFT",
  ARROWRIGHT: "RIGHT",
  DELETE: "DEL",
  PAGEDOWN: "PGDN",
  PAGEUP: "PGUP",
  MEDIAPLAYPAUSE: "MEDIA_PLAY_PAUSE",
  MEDIANEXTTRACK: "MEDIA_NEXT",
  MEDIAPREVIOUSTRACK: "MEDIA_PREV",
  VOLUMEUP: "VOLUME_UP",
  VOLUMEDOWN: "VOLUME_DOWN",
  VOLUMEMUTE: "VOLUME_MUTE",
};
const HOTKEY_ALLOWED_KEYS = new Set([
  "TAB",
  "ENTER",
  "ESC",
  "SPACE",
  "BACKSPACE",
  "DEL",
  "INS",
  "HOME",
  "END",
  "PGUP",
  "PGDN",
  "UP",
  "DOWN",
  "LEFT",
  "RIGHT",
]);
for (let i = 1; i <= 24; i += 1) HOTKEY_ALLOWED_KEYS.add(`F${i}`);
for (let i = 0; i <= 9; i += 1) HOTKEY_ALLOWED_KEYS.add(String(i));
for (let i = 65; i <= 90; i += 1) HOTKEY_ALLOWED_KEYS.add(String.fromCharCode(i));
for (const mediaKey of HOTKEY_MEDIA_KEYS) HOTKEY_ALLOWED_KEYS.add(mediaKey);

const HOTKEY_AHK_KEY_MAP = {
  TAB: "Tab",
  ENTER: "Enter",
  ESC: "Escape",
  SPACE: "Space",
  BACKSPACE: "Backspace",
  DEL: "Delete",
  INS: "Insert",
  HOME: "Home",
  END: "End",
  PGUP: "PgUp",
  PGDN: "PgDn",
  UP: "Up",
  DOWN: "Down",
  LEFT: "Left",
  RIGHT: "Right",
  VOLUME_UP: "Volume_Up",
  VOLUME_DOWN: "Volume_Down",
  VOLUME_MUTE: "Volume_Mute",
  MEDIA_PLAY_PAUSE: "Media_Play_Pause",
  MEDIA_NEXT: "Media_Next",
  MEDIA_PREV: "Media_Prev",
};
const HOTKEY_AHK_MODIFIER_MAP = {
  CTRL: "Ctrl",
  ALT: "Alt",
  SHIFT: "Shift",
  WIN: "LWin",
};

function normalizeHotkeyToken(token) {
  const raw = String(token || "").trim().toUpperCase().replace(/\s+/g, "");
  if (!raw) return "";
  return HOTKEY_KEY_ALIASES[raw] || raw;
}

function normalizeHotkeyParts(parts, { allowModifierOnly = false } = {}) {
  if (!Array.isArray(parts)) return allowModifierOnly ? [] : null;

  const cleanParts = parts.map(normalizeHotkeyToken).filter(Boolean);
  if (!cleanParts.length) return allowModifierOnly ? [] : null;

  const modSet = new Set();
  const primaryKeys = [];
  let hasPrimary = false;

  for (const part of cleanParts) {
    if (HOTKEY_MODIFIER_SET.has(part)) {
      if (hasPrimary) return null;
      modSet.add(part);
      continue;
    }

    hasPrimary = true;
    if (!HOTKEY_ALLOWED_KEYS.has(part)) return null;

    if (HOTKEY_MEDIA_KEYS.has(part)) {
      if (modSet.size > 0 || primaryKeys.length > 0) return null;
      primaryKeys.push(part);
      continue;
    }

    if (primaryKeys.some((key) => HOTKEY_MEDIA_KEYS.has(key))) return null;
    primaryKeys.push(part);
  }

  if (!hasPrimary && !allowModifierOnly) return null;
  if (primaryKeys.length > 1 && primaryKeys.some((key) => HOTKEY_MEDIA_KEYS.has(key))) return null;

  const mods = HOTKEY_MODIFIERS.filter((mod) => modSet.has(mod));
  if (primaryKeys.length === 1 && HOTKEY_MEDIA_KEYS.has(primaryKeys[0]) && mods.length > 0) {
    return null;
  }

  return [...mods, ...primaryKeys];
}

function normalizeHotkeyCombo(combo) {
  const raw = String(combo || "").trim().toUpperCase();
  if (!raw) return "";

  const parts = raw.split("+").map((token) => token.trim()).filter(Boolean);
  const normalizedParts = normalizeHotkeyParts(parts);
  if (!normalizedParts) return "";
  return normalizedParts.join("+");
}

function toAhkKeyStroke(primaryKey) {
  if (/^[A-Z0-9]$/.test(primaryKey)) return primaryKey.toLowerCase();

  let key = HOTKEY_AHK_KEY_MAP[primaryKey];
  if (!key && /^F\d{1,2}$/.test(primaryKey)) key = primaryKey;
  if (!key) return "";

  return `{${key}}`;
}

function toAhkSendSequence(combo) {
  const normalized = normalizeHotkeyCombo(combo);
  if (!normalized) return "";

  const parts = normalized.split("+");
  const modifiers = [];
  while (parts.length && HOTKEY_MODIFIER_SET.has(parts[0])) {
    modifiers.push(parts.shift());
  }

  const primaryKeys = parts;
  if (!primaryKeys.length) return "";

  if (primaryKeys.length === 1 && HOTKEY_MEDIA_KEYS.has(primaryKeys[0]) && modifiers.length > 0) {
    return "";
  }

  const keySequence = primaryKeys.map(toAhkKeyStroke);
  if (keySequence.some((value) => !value)) return "";

  if (modifiers.length === 0) {
    return keySequence.join("");
  }

  const downParts = modifiers.map((mod) => {
    const keyName = HOTKEY_AHK_MODIFIER_MAP[mod];
    return keyName ? `{${keyName} down}` : "";
  });
  const upParts = [...modifiers].reverse().map((mod) => {
    const keyName = HOTKEY_AHK_MODIFIER_MAP[mod];
    return keyName ? `{${keyName} up}` : "";
  });

  if ([...downParts, ...upParts].some((value) => !value)) return "";

  return `${downParts.join("")}${keySequence.join("")}${upParts.join("")}`;
}

function parseRunActionPayload(rawPayload) {
  if (typeof rawPayload === "string") {
    const action = String(rawPayload || "").trim();
    if (!action) return { ok: false, error: "invalid-action" };
    return { ok: true, kind: "builtin", action };
  }

  if (!rawPayload || typeof rawPayload !== "object") {
    return { ok: false, error: "invalid-action-payload" };
  }

  if (rawPayload.kind === "builtin") {
    const action = String(rawPayload.action || "").trim();
    if (!action) return { ok: false, error: "invalid-action" };
    return { ok: true, kind: "builtin", action };
  }

  if (rawPayload.kind === "hotkey") {
    const combo = normalizeHotkeyCombo(rawPayload.combo);
    const sendSequence = toAhkSendSequence(combo);
    if (!combo || !sendSequence) return { ok: false, error: "unsupported-hotkey" };
    return { ok: true, kind: "hotkey", combo, sendSequence };
  }

  return { ok: false, error: "invalid-action-kind" };
}

function runAhkAction(action, arg = "") {
  const cmd = String(action || "").trim();
  if (!cmd) return;

  const ahkExe = getAhkExePath();
  const args = [AHK_ACTIONS, cmd];
  if (arg) args.push(String(arg));

  execFile(ahkExe, args, (err) => {
    if (err) console.error("Erro AHK:", err.message);
  });
}

/* =========================
   IPC (Renderer -> Main)
   window.api.runAction("vol_down")
   window.api.runAction({ kind: "builtin", action: "vol_down" })
   window.api.runAction({ kind: "hotkey", combo: "ALT+TAB" })
========================= */
ipcMain.handle("run-action", (_evt, payload) => {
  const parsed = parseRunActionPayload(payload);
  if (!parsed.ok) return parsed;

  const now = Date.now();
  if (now - lastRunAt < COOLDOWN_MS) return { ok: true, skipped: true };

  lastRunAt = now;
  if (parsed.kind === "hotkey") {
    runAhkAction("send_hotkey", parsed.sendSequence);
  } else {
    runAhkAction(parsed.action);
  }
  return { ok: true, skipped: false };
});

ipcMain.handle("open-debug", () => {
  if (!win || win.isDestroyed()) return { ok: false, error: "Window unavailable." };
  win.webContents.openDevTools({ mode: "detach", activate: true });
  return { ok: true };
});

ipcMain.handle("quit-app", () => {
  app.isQuiting = true;
  app.quit();
  return { ok: true };
});

ipcMain.handle("get-launch-at-startup", () => {
  try {
    const settings = app.getLoginItemSettings();
    return { ok: true, enabled: !!settings.openAtLogin };
  } catch (error) {
    return { ok: false, error: String(error?.message || error) };
  }
});

ipcMain.handle("set-launch-at-startup", (_evt, enabled) => {
  try {
    app.setLoginItemSettings({
      openAtLogin: !!enabled,
      path: process.execPath,
    });
    const settings = app.getLoginItemSettings();
    return { ok: true, enabled: !!settings.openAtLogin };
  } catch (error) {
    return { ok: false, error: String(error?.message || error) };
  }
});

ipcMain.handle("export-profile-data", async (_evt, payload) => {
  try {
    const profileNameRaw = payload?.profile?.name || payload?.profileName || "perfil";
    const safeProfileName = String(profileNameRaw)
      .replace(/[^\w\- ]+/g, "")
      .trim()
      .replace(/\s+/g, "_");
    const defaultName = `${safeProfileName || "perfil"}_gestos.json`;

    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: "Exportar gestos",
      defaultPath: defaultName,
      filters: [{ name: "JSON", extensions: ["json"] }],
    });

    if (canceled || !filePath) return { ok: false, canceled: true };

    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf8");
    return { ok: true, filePath };
  } catch (error) {
    return { ok: false, error: String(error?.message || error) };
  }
});

ipcMain.handle("import-profile-data", async () => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: "Importar gestos",
      properties: ["openFile"],
      filters: [{ name: "JSON", extensions: ["json"] }],
    });

    if (canceled || !filePaths?.length) return { ok: false, canceled: true };

    const filePath = filePaths[0];
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    return { ok: true, filePath, data };
  } catch (error) {
    return { ok: false, error: String(error?.message || error) };
  }
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
