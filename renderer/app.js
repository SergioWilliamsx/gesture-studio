// =========================
// DOM
// =========================
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const appRoot = document.getElementById("appRoot");
const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeGetStarted = document.getElementById("welcomeGetStarted");
const welcomeGrantAccess = document.getElementById("welcomeGrantAccess");
const welcomeContinueNoCamera = document.getElementById("welcomeContinueNoCamera");
const welcomeNext = document.getElementById("welcomeNext");
const welcomeViewAllGestures = document.getElementById("welcomeViewAllGestures");
const welcomeCreateProfile = document.getElementById("welcomeCreateProfile");
const welcomeCardConnect = document.getElementById("welcomeCardConnect");
const welcomeCardLearn = document.getElementById("welcomeCardLearn");
const welcomeCardProfile = document.getElementById("welcomeCardProfile");
const welcomeConnectState = document.getElementById("welcomeConnectState");
const welcomeLearnState = document.getElementById("welcomeLearnState");
const welcomeProfileState = document.getElementById("welcomeProfileState");
const welcomeProgressDot1 = document.getElementById("welcomeProgressDot1");
const welcomeProgressDot2 = document.getElementById("welcomeProgressDot2");
const welcomeProgressDot3 = document.getElementById("welcomeProgressDot3");

const elCount = document.getElementById("count");
const elStatus = document.getElementById("status");
const elDot = document.getElementById("dot");
const elCamState = document.getElementById("camState");
const elFps = document.getElementById("fps");
const elHandSeen = document.getElementById("handSeen");
const elSavedCount = document.getElementById("savedCount");
const elActiveProfileText = document.getElementById("activeProfileText");

const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const btnCapture = document.getElementById("btnCapture");
const btnClearAll = document.getElementById("btnClearAll");
const btnImport = document.getElementById("btnImport");
const btnExport = document.getElementById("btnExport");
const btnNewHotkeyAction = document.getElementById("btnNewHotkeyAction");

const btnSwitchProfile = document.getElementById("btnSwitchProfile");
const btnCreateProfile = document.getElementById("btnCreateProfile");
const btnDuplicateProfile = document.getElementById("btnDuplicateProfile");

const btnMenu = document.getElementById("btnMenu");
const btnMore = document.getElementById("btnMore");
const menuBackdrop = document.getElementById("menuBackdrop");
const menuPanel = document.getElementById("menuPanel");
const menuSwitchProfile = document.getElementById("menuSwitchProfile");
const menuCreateProfile = document.getElementById("menuCreateProfile");
const menuDuplicateProfile = document.getElementById("menuDuplicateProfile");
const menuPauseDetection = document.getElementById("menuPauseDetection");
const menuOpenDebug = document.getElementById("menuOpenDebug");
const menuImport = document.getElementById("menuImport");
const menuExport = document.getElementById("menuExport");
const menuManageHotkeys = document.getElementById("menuManageHotkeys");
const menuReset = document.getElementById("menuReset");
const menuQuit = document.getElementById("menuQuit");
const menuStartupToggle = document.getElementById("menuStartupToggle");

const modalBackdrop = document.getElementById("modalBackdrop");
const profileEditorModal = document.getElementById("profileEditorModal");
const profileEditorTitle = document.getElementById("profileEditorTitle");
const profileEditorName = document.getElementById("profileEditorName");
const profileEditorSubmit = document.getElementById("profileEditorSubmit");
const profileEditorClose = document.getElementById("profileEditorClose");
const profileEditorCancel = document.getElementById("profileEditorCancel");
const profileIconGrid = document.getElementById("profileIconGrid");

const profileSwitchModal = document.getElementById("profileSwitchModal");
const profileSwitchList = document.getElementById("profileSwitchList");
const profileSwitchConfirm = document.getElementById("profileSwitchConfirm");
const profileSwitchCancel = document.getElementById("profileSwitchCancel");
const profileSwitchClose = document.getElementById("profileSwitchClose");
const profileSwitchCreate = document.getElementById("profileSwitchCreate");
const profileSwitchDuplicate = document.getElementById("profileSwitchDuplicate");
const welcomeTutorialModal = document.getElementById("welcomeTutorialModal");
const welcomeTutorialClose = document.getElementById("welcomeTutorialClose");
const welcomeTutorialDone = document.getElementById("welcomeTutorialDone");
const hotkeyManagerModal = document.getElementById("hotkeyManagerModal");
const hotkeyManagerClose = document.getElementById("hotkeyManagerClose");
const hotkeyManagerDone = document.getElementById("hotkeyManagerDone");
const hotkeyManagerList = document.getElementById("hotkeyManagerList");
const hotkeyEditorModal = document.getElementById("hotkeyEditorModal");
const hotkeyEditorTitle = document.getElementById("hotkeyEditorTitle");
const hotkeyEditorName = document.getElementById("hotkeyEditorName");
const hotkeyEditorCombo = document.getElementById("hotkeyEditorCombo");
const hotkeyEditorRecord = document.getElementById("hotkeyEditorRecord");
const hotkeyEditorPartInput = document.getElementById("hotkeyEditorPartInput");
const hotkeyEditorPartAdd = document.getElementById("hotkeyEditorPartAdd");
const hotkeyEditorPartClear = document.getElementById("hotkeyEditorPartClear");
const hotkeyPartChips = document.getElementById("hotkeyEditorPartChips");
const hotkeyEditorFireMode = document.getElementById("hotkeyEditorFireMode");
const hotkeyEditorClose = document.getElementById("hotkeyEditorClose");
const hotkeyEditorCancel = document.getElementById("hotkeyEditorCancel");
const hotkeyEditorSubmit = document.getElementById("hotkeyEditorSubmit");
const hotkeyPresetGrid = document.getElementById("hotkeyPresetGrid");

const elGestureName = document.getElementById("gestureName");
const elGestureAction = document.getElementById("gestureAction");
const elGestureList = document.getElementById("gestureList");
const sliderThr = document.getElementById("threshold");
const sliderCooldown = document.getElementById("cooldown");
const elThrLabel = document.getElementById("thrLabel");
const elCoolLabel = document.getElementById("coolLabel");

// =========================
// Constants
// =========================
const HOLD_ACTIONS = new Set(["vol_down", "vol_up"]);
const HOLD_INTERVAL_MS = 140;

const DEFAULT_THRESHOLD = 0.08;
const MIN_THRESHOLD = 0.04;
const MAX_THRESHOLD = 0.14;
const THRESHOLD_STEP = 0.002;

const DEFAULT_COOLDOWN = 1200;
const MIN_COOLDOWN = 200;
const MAX_COOLDOWN = 3000;

const STORAGE_KEY = "profiles:v1";
const LEGACY_GESTURES_KEY = "gestures:v2";
const ONBOARDING_KEY = "onboarding:v1";
const DEFAULT_PROFILE_ICON = "\u{1F3B5}";
const PROFILE_ICON_OPTIONS = [
  "\u{1F3AE}",
  "\u{1F3B5}",
  "\u{1F4BB}",
  "\u{1F3AC}",
  "\u{2B50}",
  "\u{1F4DD}",
];

const BUILTIN_ACTIONS = [
  { value: "vol_down", label: "Diminuir volume" },
  { value: "vol_up", label: "Aumentar volume" },
  { value: "mute", label: "Mute" },
  { value: "space", label: "Espaco (Space)" },
  { value: "enter", label: "Enter" },
  { value: "play_pause", label: "Play/Pause (midia)" },
];
const CUSTOM_ACTION_PREFIX = "custom_hotkey:";
const HOTKEY_FIRE_MODE_ONCE = "once";
const HOTKEY_FIRE_MODE_REPEAT = "repeat";
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

// =========================
// State
// =========================
let camera = null;
let lastLandmarks = null;
let detectionPaused = false;
let threshold = DEFAULT_THRESHOLD;
let gestureCooldown = DEFAULT_COOLDOWN;
let menuOpen = false;
let activeModal = "";
let profileEditorMode = "create";
let profileEditorSourceId = "";
let selectedProfileIcon = DEFAULT_PROFILE_ICON;
let selectedSwitchProfileId = "";
let onboardingVisible = false;
let hotkeyRecording = false;
let hotkeyCapturedCombo = "";
let hotkeyParts = [];
let hotkeyEditingActionId = "";

const gestureState = {};
let appState = loadAppState();
let onboardingState = loadOnboardingState();

// =========================
// Utils
// =========================
function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function clampInt(value, min, max) {
  return Math.round(clamp(value, min, max));
}

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function safeText(value, fallback = "") {
  const txt = String(value || "").trim();
  return txt || fallback;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  }[char]));
}

function escapeAttr(value) {
  return String(value).replace(/"/g, "&quot;");
}

function isCustomActionValue(value) {
  return typeof value === "string" && value.startsWith(CUSTOM_ACTION_PREFIX);
}

function customActionIdFromValue(value) {
  if (!isCustomActionValue(value)) return "";
  return safeText(value.slice(CUSTOM_ACTION_PREFIX.length));
}

function customActionValue(id) {
  const cleanId = safeText(id);
  return cleanId ? `${CUSTOM_ACTION_PREFIX}${cleanId}` : "";
}

function getCustomActionById(customActionId) {
  const id = safeText(customActionId);
  if (!id) return null;
  return appState?.customActions?.[id] || null;
}

function getCustomActionFromValue(value) {
  return getCustomActionById(customActionIdFromValue(value));
}

function getCustomActions() {
  return Object.values(appState?.customActions || {})
    .sort((a, b) => a.name.localeCompare(b.name));
}

function normalizeHotkeyToken(token) {
  const raw = safeText(token).toUpperCase().replace(/\s+/g, "");
  if (!raw) return "";
  return HOTKEY_KEY_ALIASES[raw] || raw;
}

function normalizeHotkeyFireMode(fireMode) {
  return fireMode === HOTKEY_FIRE_MODE_REPEAT
    ? HOTKEY_FIRE_MODE_REPEAT
    : HOTKEY_FIRE_MODE_ONCE;
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
  const raw = safeText(combo).toUpperCase();
  if (!raw) return "";
  const parts = raw.split("+").map((token) => token.trim()).filter(Boolean);
  const normalizedParts = normalizeHotkeyParts(parts);
  if (!normalizedParts) return "";
  return normalizedParts.join("+");
}

function formatHotkeyToken(token) {
  if (token === "CTRL") return "Ctrl";
  if (token === "ALT") return "Alt";
  if (token === "SHIFT") return "Shift";
  if (token === "WIN") return "Win";
  if (token.length === 1) return token.toUpperCase();
  return token
    .toLowerCase()
    .split("_")
    .map((part) => part ? part[0].toUpperCase() + part.slice(1) : "")
    .join(" ");
}

function formatHotkeyCombo(combo) {
  const normalized = normalizeHotkeyCombo(combo);
  if (!normalized) return "";
  return normalized.split("+").map(formatHotkeyToken).join("+");
}

function composeComboFromParts(parts = hotkeyParts) {
  const normalizedParts = normalizeHotkeyParts(parts, { allowModifierOnly: true });
  if (!normalizedParts || normalizedParts.length === 0) return "";
  return normalizedParts.join("+");
}

function formatHotkeyParts(parts = hotkeyParts) {
  const normalizedParts = normalizeHotkeyParts(parts, { allowModifierOnly: true });
  if (!normalizedParts || normalizedParts.length === 0) return "";
  return normalizedParts.map(formatHotkeyToken).join("+");
}

function isSupportedHotkey(combo) {
  return !!normalizeHotkeyCombo(combo);
}

function hotkeyComboFromKeyboardEvent(event) {
  const modifiers = [];
  if (event.ctrlKey) modifiers.push("CTRL");
  if (event.altKey) modifiers.push("ALT");
  if (event.shiftKey) modifiers.push("SHIFT");
  if (event.metaKey) modifiers.push("WIN");

  let primary = normalizeHotkeyToken(event.key);
  if (!primary || HOTKEY_MODIFIER_SET.has(primary)) {
    const code = String(event.code || "").toUpperCase();
    if (code.startsWith("KEY") && code.length === 4) primary = code.slice(3);
    else if (code.startsWith("DIGIT") && code.length === 6) primary = code.slice(5);
    else if (/^F\d{1,2}$/.test(code)) primary = code;
    else primary = "";
  }

  const raw = [...modifiers, primary].filter(Boolean).join("+");
  return normalizeHotkeyCombo(raw);
}

function actionLabel(value) {
  const found = BUILTIN_ACTIONS.find((action) => action.value === value);
  if (found) return found.label;

  const customAction = getCustomActionFromValue(value);
  if (customAction) return `${customAction.name} (${formatHotkeyCombo(customAction.combo)})`;
  if (isCustomActionValue(value)) return "Atalho removido";

  return value;
}

function hasActionValue(optionValue) {
  if (!optionValue) return false;
  if (BUILTIN_ACTIONS.some((action) => action.value === optionValue)) return true;
  if (!isCustomActionValue(optionValue)) return false;
  return !!getCustomActionFromValue(optionValue);
}

function renderActionOptions(preferredValue = "") {
  if (!elGestureAction) return;

  const currentValue = safeText(preferredValue || elGestureAction.value);
  const html = [];

  html.push("<optgroup label=\"Acoes padrao\">");
  for (const action of BUILTIN_ACTIONS) {
    html.push(`<option value="${escapeAttr(action.value)}">${escapeHtml(action.label)}</option>`);
  }
  html.push("</optgroup>");

  const customActions = getCustomActions();
  if (customActions.length) {
    html.push("<optgroup label=\"Atalhos personalizados\">");
    for (const action of customActions) {
      const value = customActionValue(action.id);
      const label = `${action.name} (${formatHotkeyCombo(action.combo)})`;
      html.push(`<option value="${escapeAttr(value)}">${escapeHtml(label)}</option>`);
    }
    html.push("</optgroup>");
  }

  elGestureAction.innerHTML = html.join("");

  if (hasActionValue(currentValue)) {
    elGestureAction.value = currentValue;
    return;
  }

  elGestureAction.value = BUILTIN_ACTIONS[0]?.value || "";
}

function bindClick(element, handler) {
  if (element) element.onclick = handler;
}

function bindChange(element, handler) {
  if (element) element.onchange = handler;
}

function setCamUI(on) {
  elDot.classList.toggle("on", !!on);
  elCamState.textContent = on ? "Camera ligada" : "Camera desligada";
}

function profileDisplayName(profile) {
  const icon = safeText(profile?.icon, DEFAULT_PROFILE_ICON);
  const name = safeText(profile?.name, "Perfil");
  return `${icon} ${name}`;
}

// =========================
// Storage and Profiles
// =========================
function normalizeGestureRecord(record) {
  if (!record || typeof record !== "object") return null;
  if (!Array.isArray(record.vec) || record.vec.length === 0) return null;

  return {
    vec: record.vec.map((n) => Number(n) || 0),
    action: typeof record.action === "string" ? record.action : BUILTIN_ACTIONS[0].value,
    enabled: record.enabled !== false,
    createdAt: Number(record.createdAt) || Date.now(),
  };
}

function normalizeCustomActionRecord(record) {
  if (!record || typeof record !== "object") return null;
  const name = safeText(record.name);
  const combo = normalizeHotkeyCombo(record.combo);
  const fireMode = normalizeHotkeyFireMode(record.fireMode);
  if (!name || !combo) return null;

  return {
    id: safeText(record.id, makeId()),
    name,
    combo,
    fireMode,
    createdAt: Number(record.createdAt) || Date.now(),
  };
}

function normalizeCustomActionMap(rawMap) {
  if (!rawMap || typeof rawMap !== "object") return {};
  const normalized = {};

  for (const [idKey, value] of Object.entries(rawMap)) {
    const clean = normalizeCustomActionRecord({ ...value, id: safeText(value?.id, idKey) });
    if (!clean) continue;
    if (!clean.id || normalized[clean.id]) clean.id = makeId();
    normalized[clean.id] = clean;
  }

  return normalized;
}

function normalizeGestureMap(gestureMap) {
  if (!gestureMap || typeof gestureMap !== "object") return {};
  const normalized = {};
  for (const [name, gesture] of Object.entries(gestureMap)) {
    const cleanName = safeText(name);
    if (!cleanName) continue;
    const cleanGesture = normalizeGestureRecord(gesture);
    if (!cleanGesture) continue;
    normalized[cleanName] = cleanGesture;
  }
  return normalized;
}

function normalizeProfile(profile, fallbackName = "Perfil") {
  const id = safeText(profile?.id, makeId());
  return {
    id,
    name: safeText(profile?.name, fallbackName),
    icon: safeText(profile?.icon, DEFAULT_PROFILE_ICON),
    threshold: clamp(Number(profile?.threshold), MIN_THRESHOLD, MAX_THRESHOLD),
    cooldown: clampInt(Number(profile?.cooldown), MIN_COOLDOWN, MAX_COOLDOWN),
    gestures: normalizeGestureMap(profile?.gestures),
    createdAt: Number(profile?.createdAt) || Date.now(),
  };
}

function loadLegacyGestures() {
  const raw = localStorage.getItem(LEGACY_GESTURES_KEY);
  if (!raw) return {};
  try {
    return normalizeGestureMap(JSON.parse(raw));
  } catch {
    return {};
  }
}

function createDefaultState(legacyGestures = {}) {
  const cleanLegacy = normalizeGestureMap(legacyGestures);
  if (Object.keys(cleanLegacy).length > 0) {
    return createLegacyMigrationState(cleanLegacy);
  }
  return createEmptyState();
}

function createEmptyState() {
  return {
    activeProfileId: "",
    profiles: {},
    customActions: {},
  };
}

function createLegacyMigrationState(legacyGestures) {
  const id = makeId();
  const profile = normalizeProfile({
    id,
    name: "Migracao",
    icon: DEFAULT_PROFILE_ICON,
    threshold: DEFAULT_THRESHOLD,
    cooldown: DEFAULT_COOLDOWN,
    gestures: legacyGestures,
  });

  return {
    activeProfileId: id,
    profiles: {
      [id]: profile,
    },
    customActions: {},
  };
}

function normalizeState(rawState) {
  if (!rawState || typeof rawState !== "object") return null;
  if (!rawState.profiles || typeof rawState.profiles !== "object") return null;

  const profiles = {};
  const customActions = normalizeCustomActionMap(rawState.customActions);
  let index = 1;

  for (const [idKey, profileValue] of Object.entries(rawState.profiles)) {
    const profile = normalizeProfile(
      { ...profileValue, id: safeText(profileValue?.id, idKey) },
      `Perfil ${index}`,
    );
    if (!profile.id || profiles[profile.id]) {
      profile.id = makeId();
    }
    profiles[profile.id] = profile;
    index += 1;
  }

  const profileIds = Object.keys(profiles);
  if (profileIds.length === 0) {
    return {
      activeProfileId: "",
      profiles: {},
      customActions,
    };
  }

  const activeFromRaw = safeText(rawState.activeProfileId);
  const activeProfileId = profiles[activeFromRaw]
    ? activeFromRaw
    : profileIds[0];

  return { activeProfileId, profiles, customActions };
}

function loadAppState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const normalized = normalizeState(parsed);
      if (normalized) return normalized;
    } catch {
      // fallback below
    }
  }

  const legacyGestures = loadLegacyGestures();
  const fresh = createDefaultState(legacyGestures);
  saveAppState(fresh);
  return fresh;
}

function saveAppState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createDefaultOnboardingState() {
  return {
    completed: false,
    steps: {
      connect: {
        grantAccessClicked: false,
        continueWithoutCameraClicked: false,
      },
      learn: {
        viewAllGesturesClicked: false,
        nextClicked: false,
      },
      profile: {
        createProfileClicked: false,
        profileCreated: false,
      },
    },
    lastCompletedAt: null,
  };
}

function normalizeOnboardingState(rawState) {
  if (!rawState || typeof rawState !== "object") return null;
  const fallback = createDefaultOnboardingState();
  const connect = rawState.steps?.connect || {};
  const learn = rawState.steps?.learn || {};
  const profile = rawState.steps?.profile || {};

  return {
    completed: rawState.completed === true,
    steps: {
      connect: {
        grantAccessClicked: connect.grantAccessClicked === true,
        continueWithoutCameraClicked: connect.continueWithoutCameraClicked === true,
      },
      learn: {
        viewAllGesturesClicked: learn.viewAllGesturesClicked === true,
        nextClicked: learn.nextClicked === true,
      },
      profile: {
        createProfileClicked: profile.createProfileClicked === true,
        profileCreated: profile.profileCreated === true,
      },
    },
    lastCompletedAt: safeText(rawState.lastCompletedAt, fallback.lastCompletedAt),
  };
}

function saveOnboardingState(state) {
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(state));
}

function completeOnboardingState(rawState) {
  const state = normalizeOnboardingState(rawState) || createDefaultOnboardingState();
  state.completed = true;
  state.steps.connect.grantAccessClicked = true;
  state.steps.connect.continueWithoutCameraClicked = true;
  state.steps.learn.viewAllGesturesClicked = true;
  state.steps.learn.nextClicked = true;
  state.steps.profile.createProfileClicked = true;
  state.steps.profile.profileCreated = true;
  state.lastCompletedAt = new Date().toISOString();
  return state;
}

function hasAnyProfiles(state = appState) {
  return Object.keys(state?.profiles || {}).length > 0;
}

function loadOnboardingState() {
  const raw = localStorage.getItem(ONBOARDING_KEY);
  let state = createDefaultOnboardingState();

  if (raw) {
    try {
      state = normalizeOnboardingState(JSON.parse(raw)) || createDefaultOnboardingState();
    } catch {
      state = createDefaultOnboardingState();
    }
  }

  if (hasAnyProfiles(appState) && !state.completed) {
    state = completeOnboardingState(state);
  }

  saveOnboardingState(state);
  return state;
}

function getProfiles() {
  return Object.values(appState.profiles).sort((a, b) => a.name.localeCompare(b.name));
}

function getActiveProfile() {
  if (!appState.activeProfileId) return null;
  return appState.profiles[appState.activeProfileId] || null;
}

function isProfileNameTaken(name, ignoreProfileId = "") {
  const clean = safeText(name).toLowerCase();
  if (!clean) return false;
  return getProfiles().some((profile) =>
    profile.id !== ignoreProfileId && profile.name.toLowerCase() === clean);
}

function isCustomActionNameTaken(name, ignoreActionId = "") {
  const clean = safeText(name).toLowerCase();
  if (!clean) return false;
  return getCustomActions().some((action) =>
    action.id !== ignoreActionId && action.name.toLowerCase() === clean);
}

function makeUniqueCustomActionName(baseName) {
  const cleanBase = safeText(baseName, "Atalho");
  if (!isCustomActionNameTaken(cleanBase)) return cleanBase;
  let index = 2;
  while (isCustomActionNameTaken(`${cleanBase} (${index})`)) {
    index += 1;
  }
  return `${cleanBase} (${index})`;
}

function mergeCustomActionsIntoState(rawMap) {
  const incoming = normalizeCustomActionMap(rawMap);
  const idMap = {};

  for (const action of Object.values(incoming)) {
    const next = { ...action };
    if (!next.id || appState.customActions[next.id]) {
      next.id = makeId();
    }
    next.name = makeUniqueCustomActionName(next.name);
    appState.customActions[next.id] = next;
    idMap[action.id] = next.id;
  }

  return idMap;
}

function collectReferencedCustomActions(profile) {
  const referenced = {};
  if (!profile?.gestures) return referenced;

  for (const gesture of Object.values(profile.gestures)) {
    if (!isCustomActionValue(gesture?.action)) continue;
    const id = customActionIdFromValue(gesture.action);
    const action = getCustomActionById(id);
    if (!action) continue;
    referenced[id] = action;
  }

  return referenced;
}

function collectCustomActionUsage(customActionId) {
  const id = safeText(customActionId);
  if (!id) return { count: 0, samples: [] };

  const actionValue = customActionValue(id);
  let count = 0;
  const samples = [];

  for (const profile of Object.values(appState.profiles || {})) {
    for (const [gestureName, gesture] of Object.entries(profile.gestures || {})) {
      if (gesture?.action !== actionValue) continue;
      count += 1;
      if (samples.length < 3) {
        samples.push(`${profile.name} / ${gestureName}`);
      }
    }
  }

  return { count, samples };
}

function removeCustomAction(customActionId) {
  const id = safeText(customActionId);
  const action = getCustomActionById(id);
  if (!id || !action) {
    elStatus.textContent = "Atalho nao encontrado para apagar.";
    return false;
  }

  const usage = collectCustomActionUsage(id);
  let message = `Apagar atalho "${action.name}" (${formatHotkeyCombo(action.combo)})?`;
  if (usage.count > 0) {
    const sampleText = usage.samples.length ? `\nExemplos: ${usage.samples.join(", ")}` : "";
    message += `\n\n${usage.count} gesto(s) usam este atalho e ficarao invalidos ate trocar a acao.${sampleText}`;
  }

  if (!window.confirm(message)) return false;

  delete appState.customActions[id];
  persistAndRefresh();
  renderHotkeyManagerList();

  const currentActionValue = safeText(elGestureAction?.value);
  if (customActionIdFromValue(currentActionValue) === id) {
    renderActionOptions();
  }

  const usageLabel = usage.count > 0 ? ` (${usage.count} gesto(s) afetado(s))` : "";
  elStatus.textContent = `Atalho apagado: ${action.name}${usageLabel}.`;
  return true;
}

function persistAndRefresh() {
  saveAppState(appState);
  syncProfileUI();
  renderGestureList({});
}

function setActiveProfile(profileId) {
  if (!appState.profiles[profileId]) return false;
  releaseActiveStatesForProfile(appState.activeProfileId);
  appState.activeProfileId = profileId;
  persistAndRefresh();
  return true;
}

function isOnboardingConnectComplete() {
  return onboardingState.steps.connect.grantAccessClicked
    && onboardingState.steps.connect.continueWithoutCameraClicked;
}

function isOnboardingLearnComplete() {
  return onboardingState.steps.learn.viewAllGesturesClicked
    && onboardingState.steps.learn.nextClicked;
}

function isOnboardingProfileComplete() {
  return onboardingState.steps.profile.createProfileClicked
    && onboardingState.steps.profile.profileCreated
    && hasAnyProfiles();
}

function setOnboardingVisibility(visible) {
  onboardingVisible = !!visible;
  if (onboardingVisible) {
    closeMenu();
  }
  welcomeScreen?.classList.toggle("hidden", !onboardingVisible);
  appRoot?.classList.toggle("hidden", onboardingVisible);
}

function syncWelcomeUI() {
  const connectComplete = isOnboardingConnectComplete();
  const learnComplete = isOnboardingLearnComplete();
  const profileComplete = isOnboardingProfileComplete();

  const learnUnlocked = connectComplete;
  const profileUnlocked = learnComplete;

  welcomeCardConnect?.classList.remove("is-locked");
  welcomeCardLearn?.classList.toggle("is-locked", !learnUnlocked);
  welcomeCardProfile?.classList.toggle("is-locked", !profileUnlocked);

  if (welcomeGrantAccess) {
    welcomeGrantAccess.classList.toggle("is-done", onboardingState.steps.connect.grantAccessClicked);
  }
  if (welcomeContinueNoCamera) {
    welcomeContinueNoCamera.classList.toggle("is-done", onboardingState.steps.connect.continueWithoutCameraClicked);
  }
  if (welcomeViewAllGestures) {
    welcomeViewAllGestures.disabled = !learnUnlocked;
    welcomeViewAllGestures.classList.toggle("is-done", onboardingState.steps.learn.viewAllGesturesClicked);
  }
  if (welcomeNext) {
    welcomeNext.disabled = !learnUnlocked;
    welcomeNext.classList.toggle("is-done", onboardingState.steps.learn.nextClicked);
  }
  if (welcomeCreateProfile) {
    welcomeCreateProfile.disabled = !profileUnlocked;
    welcomeCreateProfile.classList.toggle("is-done", onboardingState.steps.profile.profileCreated);
  }

  if (welcomeConnectState) {
    welcomeConnectState.textContent = connectComplete
      ? "Concluído"
      : "Clique em Conceder acesso e Continuar sem câmera";
    welcomeConnectState.classList.toggle("is-done", connectComplete);
    welcomeConnectState.classList.toggle("is-active", !connectComplete);
  }
  if (welcomeLearnState) {
    welcomeLearnState.textContent = !learnUnlocked
      ? "Bloqueado até concluir o passo 1"
      : learnComplete
        ? "Concluído"
        : "Clique em Próximo e Ver todos os gestos";
    welcomeLearnState.classList.toggle("is-done", learnComplete);
    welcomeLearnState.classList.toggle("is-active", learnUnlocked && !learnComplete);
  }
  if (welcomeProfileState) {
    welcomeProfileState.textContent = !profileUnlocked
      ? "Bloqueado até concluir o passo 2"
      : profileComplete
        ? "Concluído"
        : "Crie seu primeiro perfil para finalizar";
    welcomeProfileState.classList.toggle("is-done", profileComplete);
    welcomeProfileState.classList.toggle("is-active", profileUnlocked && !profileComplete);
  }

  const activeStep = !connectComplete ? 1 : !learnComplete ? 2 : 3;
  const dots = [welcomeProgressDot1, welcomeProgressDot2, welcomeProgressDot3];
  dots.forEach((dot, idx) => {
    if (!dot) return;
    const n = idx + 1;
    const done = (n === 1 && connectComplete) || (n === 2 && learnComplete) || (n === 3 && profileComplete);
    dot.classList.toggle("is-done", done);
    dot.classList.toggle("is-active", !done && n === activeStep);
  });
}

function refreshAppGate() {
  const shouldShowWelcome = !onboardingState.completed || !hasAnyProfiles();
  setOnboardingVisibility(shouldShowWelcome);
}

function saveOnboardingAndRefresh() {
  saveOnboardingState(onboardingState);
  syncWelcomeUI();
  refreshAppGate();
}

function maybeCompleteOnboarding() {
  if (onboardingState.completed) return;
  if (!isOnboardingConnectComplete()) return;
  if (!isOnboardingLearnComplete()) return;
  if (!isOnboardingProfileComplete()) return;

  onboardingState = completeOnboardingState(onboardingState);
  saveOnboardingAndRefresh();
  elStatus.textContent = "Onboarding concluido.";
}

// =========================
// Runtime state per gesture
// =========================
function gestureRuntimeKey(profileId, gestureName) {
  return `${profileId}::${gestureName}`;
}

function getGestureRuntimeState(profileId, gestureName) {
  const key = gestureRuntimeKey(profileId, gestureName);
  if (!gestureState[key]) {
    gestureState[key] = {
      active: false,
      lastFireAt: 0,
      holdTimer: null,
    };
  }
  return gestureState[key];
}

function stopHoldTimer(st) {
  if (st?.holdTimer) {
    clearInterval(st.holdTimer);
    st.holdTimer = null;
  }
}

function releaseActiveStatesForProfile(profileId) {
  if (!profileId) return;
  const prefix = `${profileId}::`;
  for (const [key, st] of Object.entries(gestureState)) {
    if (!key.startsWith(prefix)) continue;
    stopHoldTimer(st);
    st.active = false;
  }
}

function clearRuntimeForProfile(profileId) {
  if (!profileId) return;
  const prefix = `${profileId}::`;
  for (const [key, st] of Object.entries(gestureState)) {
    if (!key.startsWith(prefix)) continue;
    stopHoldTimer(st);
    delete gestureState[key];
  }
}

function clearAllRuntimeStates() {
  for (const [key, st] of Object.entries(gestureState)) {
    stopHoldTimer(st);
    delete gestureState[key];
  }
}

// =========================
// UI sync and menu
// =========================
function updateSavedCount() {
  const profile = getActiveProfile();
  elSavedCount.textContent = profile ? String(Object.keys(profile.gestures).length) : "0";
}

function setProfileControlsDisabled(disabled) {
  const targets = [
    btnCapture,
    btnClearAll,
    btnImport,
    btnExport,
    btnNewHotkeyAction,
    btnSwitchProfile,
    btnDuplicateProfile,
    sliderThr,
    sliderCooldown,
    elGestureName,
    elGestureAction,
  ];

  targets.forEach((element) => {
    if (!element) return;
    element.disabled = !!disabled;
  });
}

function syncProfileUI() {
  const profile = getActiveProfile();
  if (!profile) {
    threshold = DEFAULT_THRESHOLD;
    gestureCooldown = DEFAULT_COOLDOWN;
    elActiveProfileText.textContent = "Sem perfil";
    renderActionOptions(BUILTIN_ACTIONS[0]?.value || "");
    sliderThr.value = threshold.toFixed(3);
    elThrLabel.textContent = threshold.toFixed(3);
    sliderCooldown.value = String(gestureCooldown);
    elCoolLabel.textContent = `${gestureCooldown}ms`;
    updateSavedCount();
    setProfileControlsDisabled(true);
    return;
  }

  elActiveProfileText.textContent = profileDisplayName(profile);
  renderActionOptions(elGestureAction.value);

  threshold = clamp(Number(profile.threshold), MIN_THRESHOLD, MAX_THRESHOLD);
  gestureCooldown = clampInt(Number(profile.cooldown), MIN_COOLDOWN, MAX_COOLDOWN);

  sliderThr.min = String(MIN_THRESHOLD);
  sliderThr.max = String(MAX_THRESHOLD);
  sliderThr.step = String(THRESHOLD_STEP);
  sliderThr.value = threshold.toFixed(3);
  elThrLabel.textContent = threshold.toFixed(3);

  sliderCooldown.min = String(MIN_COOLDOWN);
  sliderCooldown.max = String(MAX_COOLDOWN);
  sliderCooldown.step = "50";
  sliderCooldown.value = String(gestureCooldown);
  elCoolLabel.textContent = `${gestureCooldown}ms`;

  updateSavedCount();
  setProfileControlsDisabled(false);
}

function syncBodyLock() {
  if (menuOpen || !!activeModal) {
    document.body.classList.add("menu-open");
  } else {
    document.body.classList.remove("menu-open");
  }
}

function openMenu() {
  if (onboardingVisible) return;
  if (!menuPanel) return;
  menuBackdrop?.classList.remove("hidden");
  menuPanel.classList.add("open");
  menuOpen = true;
  syncBodyLock();
}

function closeMenu() {
  if (!menuPanel) return;
  menuPanel.classList.remove("open");
  menuBackdrop?.classList.add("hidden");
  menuOpen = false;
  syncBodyLock();
}

function setDetectionPaused(paused, silent = false) {
  detectionPaused = !!paused;
  menuPauseDetection.textContent = detectionPaused ? "Retomar deteccao" : "Pausar deteccao";
  btnCapture.disabled = detectionPaused;

  if (detectionPaused) {
    releaseActiveStatesForProfile(appState.activeProfileId);
    if (!silent) elStatus.textContent = "Deteccao pausada.";
  } else if (!silent) {
    elStatus.textContent = camera ? "Deteccao retomada." : "Deteccao ativa. Inicie a camera.";
  }
}

async function refreshStartupToggle() {
  if (!window.api?.getLaunchAtStartup) {
    menuStartupToggle.disabled = true;
    return;
  }

  const result = await window.api.getLaunchAtStartup();
  if (!result?.ok) {
    menuStartupToggle.disabled = true;
    elStatus.textContent = "Nao foi possivel ler o status de inicializacao.";
    return;
  }

  menuStartupToggle.checked = !!result.enabled;
  menuStartupToggle.disabled = false;
}

// =========================
// Gesture list and actions
// =========================
function renderGestureList(liveMatches = {}) {
  const profile = getActiveProfile();
  if (!profile) {
    updateSavedCount();
    elGestureList.innerHTML = `
      <div class="item">
        <div class="itemLeft">
          <div class="name">Crie um perfil para começar</div>
          <div class="meta">
            <span class="pill warn">O onboarding vai pedir a criação do primeiro perfil</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const map = profile.gestures;
  const names = Object.keys(map).sort((a, b) => a.localeCompare(b));

  updateSavedCount();

  if (names.length === 0) {
    elGestureList.innerHTML = `
      <div class="item">
        <div class="itemLeft">
          <div class="name">Nenhum gesto ainda</div>
          <div class="meta">
            <span class="pill warn">Faca um gesto e clique em Capturar</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  elGestureList.innerHTML = names.map((name) => {
    const gesture = map[name];
    const live = liveMatches[name];
    const scoreText = typeof live?.score === "number" ? live.score.toFixed(3) : "--";
    const match = !!live?.match;
    const enabled = gesture.enabled !== false;
    const customAction = isCustomActionValue(gesture.action) ? getCustomActionFromValue(gesture.action) : null;
    const missingCustomAction = isCustomActionValue(gesture.action) && !customAction;
    const customModeLabel = customAction
      ? (customAction.fireMode === HOTKEY_FIRE_MODE_REPEAT ? "repetir" : "unico")
      : "";

    return `
      <div class="item">
        <div class="itemLeft">
          <div class="name">${escapeHtml(name)}</div>
          <div class="meta">
            <span class="pill ${match ? "match" : ""}">${match ? "MATCH" : "..."}</span>
            <span class="pill">score: <b>${scoreText}</b></span>
            <span class="pill ${missingCustomAction ? "warn" : ""}">acao: <b>${escapeHtml(actionLabel(gesture.action))}</b></span>
            ${customAction ? `<span class="pill">modo: <b>${customModeLabel}</b></span>` : ""}
            <span class="pill ${enabled && !missingCustomAction ? "" : "off"}">${enabled ? (missingCustomAction ? "invalido" : "ativo") : "desativado"}</span>
          </div>
        </div>
        <div class="itemRight">
          <button type="button" data-test="${escapeAttr(name)}">Testar</button>
          <label class="toggleLine">
            <input class="gestureToggle" type="checkbox" data-toggle="${escapeAttr(name)}" ${enabled ? "checked" : ""} />
            <span>Ativo</span>
          </label>
          <button type="button" class="danger" data-remove="${escapeAttr(name)}">Remover</button>
        </div>
      </div>
    `;
  }).join("");

  elGestureList.querySelectorAll("button[data-remove]").forEach((btn) => {
    btn.onclick = () => removeGesture(btn.getAttribute("data-remove"));
  });

  elGestureList.querySelectorAll("button[data-test]").forEach((btn) => {
    btn.onclick = () => testGesture(btn.getAttribute("data-test"));
  });

  elGestureList.querySelectorAll("input[data-toggle]").forEach((input) => {
    input.onchange = () => setGestureEnabled(input.getAttribute("data-toggle"), input.checked);
  });
}

function removeGesture(name) {
  const profile = getActiveProfile();
  if (!profile) return;
  if (!profile.gestures[name]) return;
  delete profile.gestures[name];
  clearRuntimeForProfile(profile.id);
  saveAppState(appState);
  renderGestureList({});
  elStatus.textContent = `Gesto removido: ${name}`;
}

function setGestureEnabled(name, enabled) {
  const profile = getActiveProfile();
  if (!profile) return;
  if (!profile.gestures[name]) return;
  profile.gestures[name].enabled = !!enabled;
  saveAppState(appState);
  if (!enabled) {
    const st = getGestureRuntimeState(profile.id, name);
    stopHoldTimer(st);
    st.active = false;
  }
  renderGestureList({});
}

async function testGesture(name) {
  const profile = getActiveProfile();
  if (!profile) return;
  const gesture = profile.gestures[name];
  if (!gesture) return;
  if (isCustomActionValue(gesture.action) && !getCustomActionFromValue(gesture.action)) {
    elStatus.textContent = `Atalho do gesto "${name}" nao existe mais.`;
    return;
  }
  await fireAction(gesture.action, `${name} (teste)`);
}

function clearActiveProfileGestures() {
  const profile = getActiveProfile();
  if (!profile) return;
  profile.gestures = {};
  clearRuntimeForProfile(profile.id);
  saveAppState(appState);
  renderGestureList({});
  elStatus.textContent = `Gestos apagados do perfil: ${profile.name}`;
}

// =========================
// Profile flows
// =========================
function closeModal() {
  if (hotkeyRecording) {
    stopHotkeyRecording();
  }
  activeModal = "";
  modalBackdrop?.classList.add("hidden");
  profileEditorModal?.classList.add("hidden");
  profileSwitchModal?.classList.add("hidden");
  welcomeTutorialModal?.classList.add("hidden");
  hotkeyManagerModal?.classList.add("hidden");
  hotkeyEditorModal?.classList.add("hidden");
  syncBodyLock();
}

function openModal(modalName) {
  if (modalName !== "hotkeyEditor" && hotkeyRecording) {
    stopHotkeyRecording();
  }
  activeModal = modalName;
  modalBackdrop?.classList.remove("hidden");
  profileEditorModal?.classList.toggle("hidden", modalName !== "editor");
  profileSwitchModal?.classList.toggle("hidden", modalName !== "switch");
  welcomeTutorialModal?.classList.toggle("hidden", modalName !== "welcomeTutorial");
  hotkeyManagerModal?.classList.toggle("hidden", modalName !== "hotkeyManager");
  hotkeyEditorModal?.classList.toggle("hidden", modalName !== "hotkeyEditor");
  syncBodyLock();
}

function setSelectedProfileIcon(icon) {
  selectedProfileIcon = safeText(icon, DEFAULT_PROFILE_ICON);
  if (!PROFILE_ICON_OPTIONS.includes(selectedProfileIcon)) {
    selectedProfileIcon = DEFAULT_PROFILE_ICON;
  }
  profileIconGrid?.querySelectorAll(".iconChoice").forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-icon") === selectedProfileIcon);
  });
}

function setHotkeyPresetActive(combo) {
  const normalized = normalizeHotkeyCombo(combo);
  hotkeyPresetGrid?.querySelectorAll(".hotkeyPresetBtn").forEach((button) => {
    const preset = normalizeHotkeyCombo(button.getAttribute("data-combo"));
    button.classList.toggle("active", !!normalized && preset === normalized);
  });
}

function renderHotkeyManagerList() {
  if (!hotkeyManagerList) return;
  const actions = getCustomActions();

  if (actions.length === 0) {
    hotkeyManagerList.innerHTML = `
      <div class="hotkeyManagerEmpty">
        Nenhum atalho personalizado salvo ainda.
      </div>
    `;
    return;
  }

  hotkeyManagerList.innerHTML = actions.map((action) => {
    const usage = collectCustomActionUsage(action.id);
    const mode = action.fireMode === HOTKEY_FIRE_MODE_REPEAT ? "repetir" : "unico";

    return `
      <div class="hotkeyManagerItem">
        <div class="hotkeyManagerMain">
          <div class="hotkeyManagerTitle">${escapeHtml(action.name)}</div>
          <div class="hotkeyManagerMeta">
            <span class="pill">atalho: <b>${escapeHtml(formatHotkeyCombo(action.combo))}</b></span>
            <span class="pill">modo: <b>${mode}</b></span>
            <span class="pill ${usage.count > 0 ? "warn" : ""}">gestos: <b>${usage.count}</b></span>
          </div>
        </div>
        <div class="hotkeyManagerActions">
          <button
            type="button"
            class="hotkeyManagerEdit"
            data-edit-custom-action="${escapeAttr(action.id)}"
          >
            Editar
          </button>
          <button
            type="button"
            class="danger hotkeyManagerRemove"
            data-remove-custom-action="${escapeAttr(action.id)}"
          >
            Apagar
          </button>
        </div>
      </div>
    `;
  }).join("");

  hotkeyManagerList.querySelectorAll("button[data-edit-custom-action]").forEach((button) => {
    button.onclick = () => {
      const actionId = button.getAttribute("data-edit-custom-action");
      openHotkeyEditorModal(actionId);
    };
  });

  hotkeyManagerList.querySelectorAll("button[data-remove-custom-action]").forEach((button) => {
    button.onclick = () => {
      const actionId = button.getAttribute("data-remove-custom-action");
      removeCustomAction(actionId);
    };
  });
}

function openHotkeyManagerModal() {
  renderHotkeyManagerList();
  openModal("hotkeyManager");
}

function renderHotkeyPartChips() {
  if (!hotkeyPartChips) return;
  if (!hotkeyParts.length) {
    hotkeyPartChips.innerHTML = "";
    return;
  }

  hotkeyPartChips.innerHTML = hotkeyParts.map((part, index) => {
    const label = formatHotkeyToken(part);
    return `
      <span class="hotkeyPartChip">
        <span>${escapeHtml(label)}</span>
        <button
          type="button"
          class="hotkeyPartChipRemove"
          data-remove-hotkey-part="${index}"
          aria-label="Remover ${escapeAttr(label)}"
        >&times;</button>
      </span>
    `;
  }).join("");

  hotkeyPartChips.querySelectorAll("button[data-remove-hotkey-part]").forEach((button) => {
    button.onclick = () => {
      const index = Number(button.getAttribute("data-remove-hotkey-part"));
      if (!Number.isInteger(index) || index < 0) return;
      removeHotkeyPart(index);
    };
  });
}

function syncHotkeyComboFromParts() {
  const normalizedParts = normalizeHotkeyParts(hotkeyParts, { allowModifierOnly: true });
  hotkeyParts = normalizedParts || [];
  hotkeyCapturedCombo = normalizeHotkeyCombo(hotkeyParts.join("+"));
  if (hotkeyEditorCombo) {
    hotkeyEditorCombo.value = formatHotkeyParts(hotkeyParts);
  }
  setHotkeyPresetActive(hotkeyCapturedCombo);
  renderHotkeyPartChips();
}

function syncPartsFromCombo(combo) {
  const normalized = normalizeHotkeyCombo(combo);
  hotkeyParts = normalized ? normalized.split("+") : [];
  syncHotkeyComboFromParts();
  return normalized;
}

function setHotkeyComboValue(combo) {
  syncPartsFromCombo(combo);
}

function addHotkeyPart(part) {
  const chunks = safeText(part)
    .split("+")
    .map((value) => normalizeHotkeyToken(value))
    .filter(Boolean);

  if (!chunks.length) return { ok: false, error: "empty" };

  let nextParts = [...hotkeyParts];
  for (const chunk of chunks) {
    if (!HOTKEY_MODIFIER_SET.has(chunk) && !HOTKEY_ALLOWED_KEYS.has(chunk)) {
      return { ok: false, error: "unsupported" };
    }
    const normalized = normalizeHotkeyParts([...nextParts, chunk], { allowModifierOnly: true });
    if (!normalized) return { ok: false, error: "invalid" };
    nextParts = normalized;
  }

  hotkeyParts = nextParts;
  syncHotkeyComboFromParts();
  return { ok: true };
}

function removeHotkeyPart(index) {
  if (index < 0 || index >= hotkeyParts.length) return;
  hotkeyParts = hotkeyParts.filter((_, currentIndex) => currentIndex !== index);
  syncHotkeyComboFromParts();
}

function clearHotkeyParts() {
  hotkeyParts = [];
  syncHotkeyComboFromParts();
}

function handleAddHotkeyPart() {
  const rawPart = safeText(hotkeyEditorPartInput?.value);
  if (!rawPart) {
    elStatus.textContent = "Digite uma tecla/modificador para adicionar.";
    return;
  }

  const result = addHotkeyPart(rawPart);
  if (!result.ok) {
    if (result.error === "unsupported") {
      elStatus.textContent = "Tecla nao suportada para atalho.";
      return;
    }
    elStatus.textContent = "Ordem invalida. Adicione modificadores antes das teclas e midia como item unico.";
    return;
  }

  if (hotkeyEditorPartInput) hotkeyEditorPartInput.value = "";
  if (hotkeyCapturedCombo) {
    elStatus.textContent = `Sequencia pronta: ${formatHotkeyCombo(hotkeyCapturedCombo)}.`;
  } else {
    elStatus.textContent = `Parte adicionada: ${formatHotkeyParts(hotkeyParts)}.`;
  }
}

function startHotkeyRecording() {
  hotkeyRecording = true;
  hotkeyEditorRecord?.classList.add("is-recording");
  if (hotkeyEditorRecord) hotkeyEditorRecord.textContent = "Parar";
  elStatus.textContent = "Gravando atalho: pressione a tecla/combinacao desejada.";
}

function stopHotkeyRecording() {
  hotkeyRecording = false;
  hotkeyEditorRecord?.classList.remove("is-recording");
  if (hotkeyEditorRecord) hotkeyEditorRecord.textContent = "Gravar";
}

function openHotkeyEditorModal(customActionId = "") {
  if (!hotkeyEditorName || !hotkeyEditorCombo) return;

  const editId = typeof customActionId === "string" ? safeText(customActionId) : "";
  const actionToEdit = editId ? getCustomActionById(editId) : null;
  if (editId && !actionToEdit) {
    elStatus.textContent = "Atalho selecionado para edicao nao existe mais.";
    return;
  }

  stopHotkeyRecording();
  hotkeyEditingActionId = actionToEdit?.id || "";
  if (hotkeyEditorPartInput) hotkeyEditorPartInput.value = "";

  if (actionToEdit) {
    if (hotkeyEditorTitle) hotkeyEditorTitle.textContent = "Editar atalho";
    if (hotkeyEditorSubmit) hotkeyEditorSubmit.textContent = "Salvar alteracoes";
    hotkeyEditorName.value = actionToEdit.name;
    if (hotkeyEditorFireMode) {
      hotkeyEditorFireMode.value = normalizeHotkeyFireMode(actionToEdit.fireMode);
    }
    setHotkeyComboValue(actionToEdit.combo);
  } else {
    if (hotkeyEditorTitle) hotkeyEditorTitle.textContent = "Novo atalho";
    if (hotkeyEditorSubmit) hotkeyEditorSubmit.textContent = "Salvar";
    hotkeyEditorName.value = "";
    if (hotkeyEditorFireMode) hotkeyEditorFireMode.value = HOTKEY_FIRE_MODE_ONCE;
    clearHotkeyParts();
  }

  openModal("hotkeyEditor");
  requestAnimationFrame(() => {
    hotkeyEditorName.focus();
    hotkeyEditorName.select();
  });
}

function applyHotkeyPreset(combo) {
  const normalized = normalizeHotkeyCombo(combo);
  if (!normalized) return;
  syncPartsFromCombo(normalized);
  if (!safeText(hotkeyEditorName?.value)) {
    hotkeyEditorName.value = `Atalho ${formatHotkeyCombo(normalized)}`;
  }
}

function submitHotkeyEditorModal() {
  const editingId = safeText(hotkeyEditingActionId);
  const editingAction = editingId ? getCustomActionById(editingId) : null;
  if (editingId && !editingAction) {
    elStatus.textContent = "Atalho em edicao nao existe mais.";
    hotkeyEditingActionId = "";
    return;
  }

  const name = safeText(hotkeyEditorName?.value);
  if (!name) {
    elStatus.textContent = "Informe um nome para o atalho.";
    return;
  }
  if (isCustomActionNameTaken(name, editingId)) {
    elStatus.textContent = "Ja existe um atalho com esse nome.";
    return;
  }

  const combo = normalizeHotkeyCombo(hotkeyCapturedCombo || composeComboFromParts(hotkeyParts));
  if (!combo || !isSupportedHotkey(combo)) {
    elStatus.textContent = "Monte um atalho valido: tecla simples, combinacao, sequencia ou tecla de midia unica.";
    return;
  }

  const fireMode = normalizeHotkeyFireMode(hotkeyEditorFireMode?.value);
  const id = editingAction?.id || makeId();
  appState.customActions[id] = {
    ...editingAction,
    id,
    name,
    combo,
    fireMode,
    createdAt: Number(editingAction?.createdAt) || Date.now(),
  };

  persistAndRefresh();
  const value = customActionValue(id);
  renderActionOptions(value);
  if (elGestureAction) elGestureAction.value = value;
  hotkeyEditingActionId = "";
  closeModal();
  const modeLabel = fireMode === HOTKEY_FIRE_MODE_REPEAT ? "repetir" : "unico";
  const verb = editingAction ? "Atalho atualizado" : "Atalho salvo";
  elStatus.textContent = `${verb}: ${name} (${formatHotkeyCombo(combo)}) [${modeLabel}].`;
}

function createProfileWithData(name, icon) {
  const profile = normalizeProfile({
    id: makeId(),
    name,
    icon,
    threshold: DEFAULT_THRESHOLD,
    cooldown: DEFAULT_COOLDOWN,
    gestures: {},
  });

  appState.profiles[profile.id] = profile;
  appState.activeProfileId = profile.id;
  persistAndRefresh();

  if (!onboardingState.completed) {
    onboardingState.steps.profile.profileCreated = true;
    saveOnboardingAndRefresh();
    maybeCompleteOnboarding();
  }

  elStatus.textContent = `Perfil criado: ${profileDisplayName(profile)}`;
  return true;
}

function duplicateProfileWithData(sourceProfile, name, icon) {
  const base = sourceProfile || getActiveProfile();
  if (!base) {
    elStatus.textContent = "Nenhum perfil disponivel para duplicar.";
    return false;
  }
  const clonedGestures = JSON.parse(JSON.stringify(base.gestures || {}));
  const duplicated = normalizeProfile({
    ...base,
    id: makeId(),
    name,
    icon,
    createdAt: Date.now(),
    gestures: clonedGestures,
  });

  appState.profiles[duplicated.id] = duplicated;
  appState.activeProfileId = duplicated.id;
  persistAndRefresh();
  elStatus.textContent = `Perfil duplicado: ${profileDisplayName(duplicated)}`;
  return true;
}

function openProfileEditorModal(mode, sourceProfile = null) {
  profileEditorMode = mode;
  profileEditorSourceId = sourceProfile?.id || "";

  if (!profileEditorTitle || !profileEditorName || !profileEditorSubmit) return;

  const isDuplicate = mode === "duplicate";
  profileEditorTitle.textContent = isDuplicate ? "Duplicar perfil" : "Criar novo perfil";
  profileEditorSubmit.textContent = isDuplicate ? "Duplicar" : "Criar";

  const baseName = isDuplicate && sourceProfile
    ? `${sourceProfile.name} copia`
    : "Trabalho";
  profileEditorName.value = baseName;

  const baseIcon = safeText(sourceProfile?.icon, DEFAULT_PROFILE_ICON);
  setSelectedProfileIcon(baseIcon);

  openModal("editor");
  requestAnimationFrame(() => {
    profileEditorName.focus();
    profileEditorName.select();
  });
}

function submitProfileEditorModal() {
  const name = safeText(profileEditorName?.value);
  if (!name) {
    elStatus.textContent = "Informe um nome valido para o perfil.";
    return;
  }

  if (isProfileNameTaken(name)) {
    elStatus.textContent = "Ja existe um perfil com esse nome.";
    return;
  }

  let created = false;
  if (profileEditorMode === "duplicate") {
    const source = appState.profiles[profileEditorSourceId] || getActiveProfile();
    created = duplicateProfileWithData(source, name, selectedProfileIcon);
  } else {
    created = createProfileWithData(name, selectedProfileIcon);
  }

  if (created) closeModal();
}

function createProfileFlow() {
  openProfileEditorModal("create");
}

function duplicateProfileFlow(sourceProfile = null) {
  const base = sourceProfile || getActiveProfile();
  if (!base) {
    elStatus.textContent = "Crie um perfil antes de duplicar.";
    return;
  }
  openProfileEditorModal("duplicate", base);
}

function renderProfileSwitchList() {
  if (!profileSwitchList) return;

  const profiles = getProfiles();
  profileSwitchList.innerHTML = profiles.map((profile) => {
    const active = profile.id === selectedSwitchProfileId;
    return `
      <button
        class="profileSwitchItem ${active ? "active" : ""}"
        type="button"
        data-profile-id="${escapeAttr(profile.id)}"
      >
        <span>${escapeHtml(profileDisplayName(profile))}</span>
        <span>${active ? "✓" : ""}</span>
      </button>
    `;
  }).join("");

  profileSwitchList.querySelectorAll("button[data-profile-id]").forEach((button) => {
    button.onclick = () => {
      selectedSwitchProfileId = button.getAttribute("data-profile-id");
      renderProfileSwitchList();
    };
  });
}

function switchProfileFlow() {
  if (!hasAnyProfiles()) {
    elStatus.textContent = "Nenhum perfil criado ainda.";
    return;
  }
  selectedSwitchProfileId = appState.activeProfileId;
  renderProfileSwitchList();
  openModal("switch");
}

function confirmSwitchProfileModal() {
  if (!selectedSwitchProfileId) return;
  if (selectedSwitchProfileId === appState.activeProfileId) {
    closeModal();
    return;
  }

  const target = appState.profiles[selectedSwitchProfileId];
  if (!target) {
    elStatus.textContent = "Perfil selecionado nao existe.";
    return;
  }

  const ok = setActiveProfile(target.id);
  if (!ok) {
    elStatus.textContent = "Nao foi possivel trocar o perfil.";
    return;
  }

  closeModal();
  elStatus.textContent = `Perfil ativo: ${profileDisplayName(target)}`;
}

// =========================
// Import / Export / Reset
// =========================
function normalizeImportedPayload(payload) {
  if (!payload || typeof payload !== "object") return null;

  if (payload.format === "gesture-studio-profile-v1" && payload.profile) {
    return {
      gestures: normalizeGestureMap(payload.profile.gestures),
      threshold: Number(payload.profile.threshold),
      cooldown: Number(payload.profile.cooldown),
      customActions: normalizeCustomActionMap(payload.customActions || payload.profile.customActions),
    };
  }

  if (payload.gestures && typeof payload.gestures === "object") {
    return {
      gestures: normalizeGestureMap(payload.gestures),
      threshold: Number(payload.threshold),
      cooldown: Number(payload.cooldown),
      customActions: normalizeCustomActionMap(payload.customActions),
    };
  }

  return {
    gestures: normalizeGestureMap(payload),
    threshold: Number(payload.threshold),
    cooldown: Number(payload.cooldown),
    customActions: normalizeCustomActionMap(payload.customActions),
  };
}

async function importGesturesFlow() {
  const profile = getActiveProfile();
  if (!profile) {
    elStatus.textContent = "Crie um perfil antes de importar.";
    return;
  }

  if (!window.api?.importProfileData) {
    elStatus.textContent = "Importacao indisponivel (preload/IPC).";
    return;
  }

  const result = await window.api.importProfileData();
  if (!result?.ok) {
    if (!result?.canceled) {
      elStatus.textContent = `Erro ao importar: ${result?.error || "desconhecido"}`;
    }
    return;
  }

  const normalized = normalizeImportedPayload(result.data);
  const customActionIdMap = mergeCustomActionsIntoState(normalized?.customActions);
  const importedGestures = {};
  for (const [gestureName, gesture] of Object.entries(normalized?.gestures || {})) {
    const nextGesture = { ...gesture };
    if (isCustomActionValue(nextGesture.action)) {
      const oldId = customActionIdFromValue(nextGesture.action);
      const remappedId = customActionIdMap[oldId] || (getCustomActionById(oldId) ? oldId : "");
      if (remappedId) {
        nextGesture.action = customActionValue(remappedId);
      }
    }
    importedGestures[gestureName] = nextGesture;
  }
  const count = Object.keys(importedGestures).length;
  const customCount = Object.keys(customActionIdMap).length;
  if (count === 0 && customCount === 0) {
    elStatus.textContent = "Arquivo nao possui gestos validos.";
    return;
  }
  if (count === 0 && customCount > 0) {
    saveAppState(appState);
    syncProfileUI();
    elStatus.textContent = `Importacao concluida (${customCount} atalhos, sem gestos).`;
    return;
  }

  const replace = window.confirm(
    `Foram encontrados ${count} gestos.\nOK = substituir os gestos do perfil ativo\nCancelar = mesclar com os atuais`,
  );

  profile.gestures = replace
    ? importedGestures
    : { ...profile.gestures, ...importedGestures };

  if (Number.isFinite(normalized.threshold)) {
    profile.threshold = clamp(normalized.threshold, MIN_THRESHOLD, MAX_THRESHOLD);
  }
  if (Number.isFinite(normalized.cooldown)) {
    profile.cooldown = clampInt(normalized.cooldown, MIN_COOLDOWN, MAX_COOLDOWN);
  }

  persistAndRefresh();
  elStatus.textContent = customCount > 0
    ? `Importacao concluida (${count} gestos, ${customCount} atalhos).`
    : `Importacao concluida (${count} gestos).`;
}

async function exportGesturesFlow() {
  const profile = getActiveProfile();
  if (!profile) {
    elStatus.textContent = "Crie um perfil antes de exportar.";
    return;
  }

  if (!window.api?.exportProfileData) {
    elStatus.textContent = "Exportacao indisponivel (preload/IPC).";
    return;
  }

  const payload = {
    format: "gesture-studio-profile-v1",
    app: "Gesture Studio",
    exportedAt: new Date().toISOString(),
    customActions: collectReferencedCustomActions(profile),
    profile: {
      name: profile.name,
      icon: profile.icon,
      threshold: profile.threshold,
      cooldown: profile.cooldown,
      gestures: profile.gestures,
    },
  };

  const result = await window.api.exportProfileData(payload);
  if (!result?.ok) {
    if (!result?.canceled) {
      elStatus.textContent = `Erro ao exportar: ${result?.error || "desconhecido"}`;
    }
    return;
  }

  elStatus.textContent = `Exportado em: ${result.filePath}`;
}

function resetAllSettingsFlow() {
  const ok = window.confirm(
    "Resetar configuracoes e perfis?\nIsso apaga perfis, gestos, threshold e cooldown salvos.",
  );
  if (!ok) return;

  stop();
  clearAllRuntimeStates();
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_GESTURES_KEY);
  localStorage.removeItem(ONBOARDING_KEY);

  appState = createDefaultState({});
  saveAppState(appState);
  onboardingState = createDefaultOnboardingState();
  saveOnboardingState(onboardingState);
  closeModal();
  closeMenu();
  setDetectionPaused(false, true);
  syncProfileUI();
  renderGestureList({});
  syncWelcomeUI();
  refreshAppGate();

  elStatus.textContent = "Configuracoes resetadas.";
}

// =========================
// Capture and action fire
// =========================
btnCapture.onclick = () => {
  const profile = getActiveProfile();
  if (!profile) {
    elStatus.textContent = "Crie um perfil antes de capturar gestos.";
    return;
  }

  if (detectionPaused) {
    elStatus.textContent = "A deteccao esta pausada.";
    return;
  }

  const name = safeText(elGestureName.value);
  if (!name) {
    elStatus.textContent = "Digite um nome para o gesto.";
    return;
  }
  if (!lastLandmarks) {
    elStatus.textContent = "Mostre a mao na camera antes de capturar.";
    return;
  }

  const selectedAction = safeText(elGestureAction.value);
  if (!hasActionValue(selectedAction)) {
    renderActionOptions();
    elStatus.textContent = "Selecione uma acao valida antes de capturar.";
    return;
  }

  profile.gestures[name] = {
    vec: handVector(lastLandmarks),
    action: selectedAction,
    enabled: true,
    createdAt: Date.now(),
  };

  saveAppState(appState);
  renderGestureList({});

  elGestureName.value = "";
  elStatus.textContent = `Gesto "${name}" capturado em ${profile.name}.`;
};

async function fireAction(action, name) {
  if (!window.api || typeof window.api.runAction !== "function") {
    elStatus.textContent = "runAction indisponivel (preload/IPC).";
    return;
  }

  let payload = { kind: "builtin", action };
  if (isCustomActionValue(action)) {
    const custom = getCustomActionFromValue(action);
    if (!custom) {
      elStatus.textContent = `Atalho ausente para: ${name}`;
      return;
    }
    payload = { kind: "hotkey", combo: custom.combo };
  }

  try {
    const result = await window.api.runAction(payload);
    if (result?.ok === false) {
      if (result.error === "unsupported-hotkey") {
        elStatus.textContent = `Atalho nao suportado: ${name}`;
      } else {
        elStatus.textContent = `Falha ao executar acao: ${result.error || "desconhecido"}`;
      }
      return;
    }
    if (result?.skipped) {
      elStatus.textContent = `Cooldown no processo principal: ${name}`;
      return;
    }
    elStatus.textContent = `MATCH: ${name} -> ${actionLabel(action)}`;
  } catch (error) {
    console.error(error);
    elStatus.textContent = `Erro no IPC: ${error?.message || error}`;
  }
}

// =========================
// Feature extraction
// =========================
function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

const PAIRS = [
  [4, 8],
  [8, 12],
  [12, 16],
  [16, 20],
  [0, 12],
  [0, 8],
  [0, 4],
  [4, 12],
  [8, 16],
];

function handVector(landmarks) {
  const scale = dist(landmarks[0], landmarks[12]) || 1;
  return PAIRS.map(([i, j]) => dist(landmarks[i], landmarks[j]) / scale);
}

function vectorDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) sum += Math.abs(a[i] - b[i]);
  return sum / a.length;
}

// =========================
// Finger count (UI only)
// =========================
const TIP = { thumb: 4, index: 8, middle: 12, ring: 16, pinky: 20 };
const PIP = { index: 6, middle: 10, ring: 14, pinky: 18 };

function countFingers(handLandmarks, handednessLabel) {
  let count = 0;

  if (handLandmarks[TIP.index].y < handLandmarks[PIP.index].y) count += 1;
  if (handLandmarks[TIP.middle].y < handLandmarks[PIP.middle].y) count += 1;
  if (handLandmarks[TIP.ring].y < handLandmarks[PIP.ring].y) count += 1;
  if (handLandmarks[TIP.pinky].y < handLandmarks[PIP.pinky].y) count += 1;

  const thumbTip = handLandmarks[TIP.thumb];
  const thumbIp = handLandmarks[3];
  const isRight = String(handednessLabel || "").toLowerCase().includes("right");
  const thumbExtended = isRight ? thumbTip.x > thumbIp.x : thumbTip.x < thumbIp.x;
  if (thumbExtended) count += 1;

  return count;
}

// =========================
// MediaPipe Hands
// =========================
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.6,
});

let lastFrameAt = 0;
let fpsSmooth = 0;

hands.onResults((results) => {
  const width = video.videoWidth || 640;
  const height = video.videoHeight || 480;
  canvas.width = width;
  canvas.height = height;

  const nowPerf = performance.now();
  if (lastFrameAt) {
    const fps = 1000 / (nowPerf - lastFrameAt);
    fpsSmooth = fpsSmooth ? fpsSmooth * 0.85 + fps * 0.15 : fps;
    elFps.textContent = String(Math.round(fpsSmooth));
  }
  lastFrameAt = nowPerf;

  ctx.save();
  ctx.clearRect(0, 0, width, height);
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(results.image, 0, 0, width, height);

  let fingerCount = 0;
  const liveMatches = {};

  if (results.multiHandLandmarks?.length) {
    const landmarks = results.multiHandLandmarks[0];
    const handedness = results.multiHandedness?.[0]?.label || "Right";

    lastLandmarks = landmarks;
    elHandSeen.textContent = "sim";

    drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { lineWidth: 2 });
    drawLandmarks(ctx, landmarks, { lineWidth: 1 });
    fingerCount = countFingers(landmarks, handedness);

    if (!detectionPaused) {
      const profile = getActiveProfile();
      if (profile) {
        const nowVec = handVector(landmarks);

        for (const [name, gesture] of Object.entries(profile.gestures)) {
          const score = vectorDistance(nowVec, gesture.vec);
          const customAction = isCustomActionValue(gesture.action) ? getCustomActionFromValue(gesture.action) : null;
          const missingCustomAction = isCustomActionValue(gesture.action) && !customAction;
          const canRun = gesture.enabled !== false && !missingCustomAction;
          const match = canRun && score < threshold;
          liveMatches[name] = { score, match };

          const st = getGestureRuntimeState(profile.id, name);
          const isHold = (!customAction && HOLD_ACTIONS.has(gesture.action))
            || (customAction?.fireMode === HOTKEY_FIRE_MODE_REPEAT);

          if (match) {
            if (!st.active) {
              st.active = true;
              if (isHold) {
                fireAction(gesture.action, name);
                st.holdTimer = setInterval(() => {
                  if (st.active) fireAction(gesture.action, name);
                }, HOLD_INTERVAL_MS);
              } else {
                const now = Date.now();
                if (now - st.lastFireAt > gestureCooldown) {
                  st.lastFireAt = now;
                  fireAction(gesture.action, name);
                }
              }
            }
          } else if (st.active) {
            st.active = false;
            stopHoldTimer(st);
          }
        }
      }
    }
  } else {
    lastLandmarks = null;
    elHandSeen.textContent = "nao";
    releaseActiveStatesForProfile(appState.activeProfileId);
  }

  ctx.restore();
  elCount.textContent = String(fingerCount);
  renderGestureList(liveMatches);
});

// =========================
// Camera start/stop
// =========================
async function start() {
  if (camera) return true;

  elStatus.textContent = "Iniciando camera...";
  setCamUI(true);

  try {
    camera = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: 640,
      height: 480,
    });

    await camera.start();
    elStatus.textContent = detectionPaused
      ? "Camera ligada. Deteccao pausada."
      : "Rodando. Mostre a mao e capture um gesto.";
    return true;
  } catch (error) {
    console.error(error);
    camera = null;
    setCamUI(false);
    elStatus.textContent = `Falha ao iniciar camera: ${error?.message || error}`;
    return false;
  }
}

function stop() {
  if (camera) {
    try {
      camera.stop();
    } catch (error) {
      console.error(error);
    }
  }
  camera = null;
  setCamUI(false);
  lastLandmarks = null;
  elHandSeen.textContent = "nao";
  elFps.textContent = "0";
  clearAllRuntimeStates();
  renderGestureList({});
  elStatus.textContent = "Parado.";
}

function updateOnboardingState(mutator) {
  if (onboardingState.completed) return;
  mutator(onboardingState);
  saveOnboardingAndRefresh();
  maybeCompleteOnboarding();
}

function onboardingGetStartedFlow() {
  const target = document.getElementById("welcomeSteps");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function onboardingGrantAccessFlow() {
  updateOnboardingState((state) => {
    state.steps.connect.grantAccessClicked = true;
  });
  const started = await start();
  if (started) {
    updateOnboardingState((state) => {
      state.steps.connect.continueWithoutCameraClicked = true;
    });
    elStatus.textContent = "Camera autorizada. Passo 1 concluido automaticamente.";
    welcomeCardLearn?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function onboardingContinueNoCameraFlow() {
  updateOnboardingState((state) => {
    state.steps.connect.continueWithoutCameraClicked = true;
  });
  elStatus.textContent = "Onboarding: continuar sem camera.";
}

function onboardingViewAllGesturesFlow() {
  if (!isOnboardingConnectComplete()) return;
  updateOnboardingState((state) => {
    state.steps.learn.viewAllGesturesClicked = true;
  });
  openModal("welcomeTutorial");
}

function onboardingNextFlow() {
  if (!isOnboardingConnectComplete()) return;
  updateOnboardingState((state) => {
    state.steps.learn.nextClicked = true;
  });
}

function onboardingCreateProfileFlow() {
  if (!isOnboardingLearnComplete()) return;
  updateOnboardingState((state) => {
    state.steps.profile.createProfileClicked = true;
  });
  openProfileEditorModal("create");
}

// =========================
// Events
// =========================
bindClick(btnStart, start);
bindClick(btnStop, stop);
bindClick(welcomeGetStarted, onboardingGetStartedFlow);
bindClick(welcomeGrantAccess, onboardingGrantAccessFlow);
bindClick(welcomeContinueNoCamera, onboardingContinueNoCameraFlow);
bindClick(welcomeViewAllGestures, onboardingViewAllGesturesFlow);
bindClick(welcomeNext, onboardingNextFlow);
bindClick(welcomeCreateProfile, onboardingCreateProfileFlow);

if (sliderThr) {
  sliderThr.oninput = () => {
    const profile = getActiveProfile();
    if (!profile) return;
    threshold = clamp(Number(sliderThr.value), MIN_THRESHOLD, MAX_THRESHOLD);
    profile.threshold = threshold;
    elThrLabel.textContent = threshold.toFixed(3);
    saveAppState(appState);
  };
}

if (sliderCooldown) {
  sliderCooldown.oninput = () => {
    const profile = getActiveProfile();
    if (!profile) return;
    gestureCooldown = clampInt(Number(sliderCooldown.value), MIN_COOLDOWN, MAX_COOLDOWN);
    profile.cooldown = gestureCooldown;
    elCoolLabel.textContent = `${gestureCooldown}ms`;
    saveAppState(appState);
  };
}

bindClick(btnClearAll, () => {
  const ok = window.confirm("Apagar todos os gestos do perfil ativo?");
  if (!ok) return;
  clearActiveProfileGestures();
});

bindClick(btnSwitchProfile, switchProfileFlow);
bindClick(btnCreateProfile, createProfileFlow);
bindClick(btnDuplicateProfile, () => duplicateProfileFlow());
bindClick(btnImport, importGesturesFlow);
bindClick(btnExport, exportGesturesFlow);
bindClick(btnNewHotkeyAction, openHotkeyEditorModal);

bindClick(btnMenu, () => {
  if (menuOpen) closeMenu();
  else openMenu();
});
bindClick(btnMore, () => {
  if (menuOpen) closeMenu();
  else openMenu();
});
bindClick(menuBackdrop, closeMenu);

bindClick(menuSwitchProfile, () => {
  closeMenu();
  switchProfileFlow();
});
bindClick(menuCreateProfile, () => {
  closeMenu();
  createProfileFlow();
});
bindClick(menuDuplicateProfile, () => {
  closeMenu();
  duplicateProfileFlow();
});
bindClick(menuPauseDetection, () => {
  setDetectionPaused(!detectionPaused);
  closeMenu();
});
bindClick(menuOpenDebug, async () => {
  if (!window.api?.openDebug) {
    elStatus.textContent = "Debug indisponivel (preload/IPC).";
    closeMenu();
    return;
  }

  const result = await window.api.openDebug();
  if (!result?.ok) {
    elStatus.textContent = `Falha ao abrir debug: ${result?.error || "desconhecido"}`;
  } else {
    elStatus.textContent = "Debug aberto.";
  }
  closeMenu();
});
bindClick(menuImport, () => {
  closeMenu();
  importGesturesFlow();
});
bindClick(menuExport, () => {
  closeMenu();
  exportGesturesFlow();
});
bindClick(menuManageHotkeys, () => {
  closeMenu();
  openHotkeyManagerModal();
});
bindClick(menuReset, () => {
  closeMenu();
  resetAllSettingsFlow();
});
bindClick(menuQuit, async () => {
  if (!window.api?.quitApp) {
    elStatus.textContent = "Saida indisponivel (preload/IPC).";
    closeMenu();
    return;
  }
  await window.api.quitApp();
});

bindChange(menuStartupToggle, async () => {
  if (!window.api?.setLaunchAtStartup) {
    menuStartupToggle.checked = false;
    menuStartupToggle.disabled = true;
    elStatus.textContent = "Opcao de startup indisponivel.";
    return;
  }

  const result = await window.api.setLaunchAtStartup(menuStartupToggle.checked);
  if (!result?.ok) {
    menuStartupToggle.checked = !menuStartupToggle.checked;
    elStatus.textContent = `Nao foi possivel salvar startup: ${result?.error || "desconhecido"}`;
    return;
  }

  menuStartupToggle.checked = !!result.enabled;
  elStatus.textContent = result.enabled
    ? "Iniciar com Windows ativado."
    : "Iniciar com Windows desativado.";
});

if (profileIconGrid) {
  profileIconGrid.querySelectorAll(".iconChoice").forEach((button) => {
    bindClick(button, () => setSelectedProfileIcon(button.getAttribute("data-icon")));
  });
}

if (profileEditorName) {
  profileEditorName.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    submitProfileEditorModal();
  });
}

bindClick(profileEditorSubmit, submitProfileEditorModal);
bindClick(profileEditorClose, closeModal);
bindClick(profileEditorCancel, closeModal);

bindClick(profileSwitchConfirm, confirmSwitchProfileModal);
bindClick(profileSwitchClose, closeModal);
bindClick(profileSwitchCancel, closeModal);
bindClick(profileSwitchCreate, () => openProfileEditorModal("create"));
bindClick(profileSwitchDuplicate, () => {
  const source = appState.profiles[selectedSwitchProfileId] || getActiveProfile();
  openProfileEditorModal("duplicate", source);
});
bindClick(welcomeTutorialClose, closeModal);
bindClick(welcomeTutorialDone, closeModal);
bindClick(hotkeyManagerClose, closeModal);
bindClick(hotkeyManagerDone, closeModal);
bindClick(hotkeyEditorClose, closeModal);
bindClick(hotkeyEditorCancel, closeModal);
bindClick(hotkeyEditorSubmit, submitHotkeyEditorModal);
bindClick(hotkeyEditorRecord, () => {
  if (hotkeyRecording) {
    stopHotkeyRecording();
  } else {
    startHotkeyRecording();
  }
});
bindClick(hotkeyEditorPartAdd, handleAddHotkeyPart);
bindClick(hotkeyEditorPartClear, () => {
  clearHotkeyParts();
  elStatus.textContent = "Sequencia limpa.";
});

if (hotkeyPresetGrid) {
  hotkeyPresetGrid.querySelectorAll(".hotkeyPresetBtn").forEach((button) => {
    bindClick(button, () => applyHotkeyPreset(button.getAttribute("data-combo")));
  });
}

if (hotkeyEditorPartInput) {
  hotkeyEditorPartInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddHotkeyPart();
      return;
    }
    if (event.key === "Backspace" && !hotkeyEditorPartInput.value && hotkeyParts.length > 0) {
      event.preventDefault();
      removeHotkeyPart(hotkeyParts.length - 1);
      elStatus.textContent = "Ultima parte removida.";
    }
  });
}

if (hotkeyEditorName) {
  hotkeyEditorName.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    submitHotkeyEditorModal();
  });
}

bindClick(modalBackdrop, (event) => {
  if (event.target === modalBackdrop) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (activeModal === "hotkeyEditor" && hotkeyRecording) {
    event.preventDefault();
    if (event.key === "Escape") {
      stopHotkeyRecording();
      elStatus.textContent = "Gravacao de atalho cancelada.";
      return;
    }

    const combo = hotkeyComboFromKeyboardEvent(event);
    if (!combo) {
      elStatus.textContent = "Combinacao invalida. Use tecla simples, combinacao com modificador ou midia unica.";
      return;
    }

    setHotkeyComboValue(combo);
    stopHotkeyRecording();
    if (!safeText(hotkeyEditorName?.value)) {
      hotkeyEditorName.value = `Atalho ${formatHotkeyCombo(combo)}`;
    }
    elStatus.textContent = `Atalho gravado: ${formatHotkeyCombo(combo)}.`;
    return;
  }

  if (event.key !== "Escape") return;
  if (activeModal) {
    closeModal();
    return;
  }
  if (menuOpen) closeMenu();
});

// =========================
// Init
// =========================
setSelectedProfileIcon(DEFAULT_PROFILE_ICON);
closeModal();
closeMenu();
setDetectionPaused(false, true);
setCamUI(false);
syncProfileUI();
renderGestureList({});
syncWelcomeUI();
refreshAppGate();
refreshStartupToggle();

