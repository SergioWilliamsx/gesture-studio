// =========================
// DOM
// =========================
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const elCount = document.getElementById("count");
const elStatus = document.getElementById("status");
const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");

const elDot = document.getElementById("dot");
const elCamState = document.getElementById("camState");
const elFps = document.getElementById("fps");
const elHandSeen = document.getElementById("handSeen");

const elGestureName = document.getElementById("gestureName");
const elGestureAction = document.getElementById("gestureAction");
const btnCapture = document.getElementById("btnCapture");
const elGestureList = document.getElementById("gestureList");
const elSavedCount = document.getElementById("savedCount");

const sliderThr = document.getElementById("threshold");
const elThrLabel = document.getElementById("thrLabel");
const btnClearAll = document.getElementById("btnClearAll");

const elCoolLabel = document.getElementById("coolLabel");

const HOLD_ACTIONS = new Set(["vol_down", "vol_up"]);

// intervalo de repetição enquanto estiver em MATCH
// 120~200ms fica bom; se ficar rápido demais, aumenta.
const HOLD_INTERVAL_MS = 140;

// =========================
// Actions available
// (tem que bater com o actions.ahk)
// =========================
const ACTIONS = [
  { value: "vol_down", label: "Diminuir volume" },
  { value: "vol_up", label: "Aumentar volume" },
  { value: "mute", label: "Mute" },
  { value: "space", label: "Espaço (Space)" },
  { value: "enter", label: "Enter" },
  { value: "play_pause", label: "Play/Pause (mídia)" },
];

elGestureAction.innerHTML = ACTIONS
  .map((a) => `<option value="${a.value}">${a.label}</option>`)
  .join("");

// =========================
// State
// =========================
let camera = null;
let lastLandmarks = null;

let threshold = Number(sliderThr.value);
elThrLabel.textContent = threshold.toFixed(3);

sliderThr.oninput = () => {
  threshold = Number(sliderThr.value);
  elThrLabel.textContent = threshold.toFixed(3);
};

const FIRE_COOLDOWN = 1200; // por gesto
elCoolLabel.textContent = `${FIRE_COOLDOWN}ms`;

// estado de cada gesto: edge detect + cooldown
const gestureState = {}; // { [name]: { active: boolean, lastFireAt: number } }

// =========================
// UI helpers
// =========================
function setCamUI(on) {
  elDot.classList.toggle("on", on);
  elCamState.textContent = on ? "Câmera ligada" : "Câmera desligada";
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[c]));
}

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

function actionLabel(value) {
  const found = ACTIONS.find((a) => a.value === value);
  return found ? found.label : value;
}

// =========================
// Storage (localStorage)
// =========================
function loadGestures() {
  const raw = localStorage.getItem("gestures:v2");
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveGestures(map) {
  localStorage.setItem("gestures:v2", JSON.stringify(map));
}

function updateSavedCount() {
  const map = loadGestures();
  elSavedCount.textContent = String(Object.keys(map).length);
}

function removeGesture(name) {
  const map = loadGestures();
  delete map[name];
  saveGestures(map);
  delete gestureState[name];
  renderGestureList();
}

function clearAllGestures() {
  localStorage.removeItem("gestures:v2");
  for (const k of Object.keys(gestureState)) delete gestureState[k];
  renderGestureList();
}

btnClearAll.onclick = () => {
  clearAllGestures();
  elStatus.textContent = "Todos os gestos foram apagados.";
};

// =========================
// Feature extraction (template)
// =========================
function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

// pares escolhidos para capturar “formato” da mão
const PAIRS = [
  [4, 8],   // thumb tip - index tip
  [8, 12],  // index tip - middle tip
  [12, 16], // middle tip - ring tip
  [16, 20], // ring tip - pinky tip
  [0, 12],  // wrist - middle tip (escala)
  [0, 8],   // wrist - index tip
  [0, 4],   // wrist - thumb tip
  [4, 12],  // thumb tip - middle tip
  [8, 16],  // index tip - ring tip
];

function handVector(landmarks) {
  // normaliza por tamanho da mão
  const scale = dist(landmarks[0], landmarks[12]) || 1;
  return PAIRS.map(([i, j]) => dist(landmarks[i], landmarks[j]) / scale);
}

function vectorDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
  return sum / a.length;
}

// =========================
// Finger count (apenas UI)
// =========================
const TIP = { thumb: 4, index: 8, middle: 12, ring: 16, pinky: 20 };
const PIP = { index: 6, middle: 10, ring: 14, pinky: 18 };

function countFingers(handLandmarks, handednessLabel) {
  let count = 0;

  if (handLandmarks[TIP.index].y < handLandmarks[PIP.index].y) count++;
  if (handLandmarks[TIP.middle].y < handLandmarks[PIP.middle].y) count++;
  if (handLandmarks[TIP.ring].y < handLandmarks[PIP.ring].y) count++;
  if (handLandmarks[TIP.pinky].y < handLandmarks[PIP.pinky].y) count++;

  const thumbTip = handLandmarks[TIP.thumb];
  const thumbIp = handLandmarks[3];

  const isRight = (handednessLabel || "").toLowerCase().includes("right");
  const thumbExtended = isRight ? (thumbTip.x > thumbIp.x) : (thumbTip.x < thumbIp.x);

  if (thumbExtended) count++;
  return count;
}

// =========================
// Render list
// =========================
function renderGestureList(liveMatches = {}) {
  const map = loadGestures();
  const names = Object.keys(map).sort((a, b) => a.localeCompare(b));

  updateSavedCount();

  if (names.length === 0) {
    elGestureList.innerHTML = `
      <div class="item">
        <div class="itemLeft">
          <div class="name">Nenhum gesto ainda</div>
          <div class="meta">
            <span class="pill warn">Faça um gesto e clique “Capturar”</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  elGestureList.innerHTML = names.map((name) => {
    const data = map[name];
    const m = liveMatches[name];

    const score = typeof m?.score === "number" ? m.score : null;
    const isMatch = !!m?.match;

    const pillClass = isMatch ? "pill match" : "pill";
    const pillText = isMatch ? "MATCH" : "…";

    const scoreText = score === null ? "—" : score.toFixed(3);

    return `
      <div class="item">
        <div class="itemLeft">
          <div class="name">${escapeHtml(name)}</div>
          <div class="meta">
            <span class="${pillClass}">${pillText}</span>
            <span class="pill">score: <b>${scoreText}</b></span>
            <span class="pill">ação: <b>${escapeHtml(actionLabel(data.action))}</b></span>
          </div>
        </div>
        <div class="itemRight">
          <button class="danger" data-remove="${escapeAttr(name)}">Remover</button>
        </div>
      </div>
    `;
  }).join("");

  elGestureList.querySelectorAll("button[data-remove]").forEach((btn) => {
    btn.onclick = () => removeGesture(btn.getAttribute("data-remove"));
  });
}

renderGestureList();

// =========================
// Capture gesture (name + action)
// =========================
btnCapture.onclick = () => {
  const name = (elGestureName.value || "").trim();
  const action = elGestureAction.value;

  if (!name) {
    elStatus.textContent = "Digite um nome para o gesto.";
    return;
  }
  if (!lastLandmarks) {
    elStatus.textContent = "Mostre a mão na câmera antes de capturar.";
    return;
  }

  const vec = handVector(lastLandmarks);
  const map = loadGestures();

  map[name] = { vec, action, createdAt: Date.now() };
  saveGestures(map);

  // reseta state pra evitar disparo estranho
  gestureState[name] = { active: false, lastFireAt: 0 };

  elStatus.textContent = `Gesto "${name}" capturado → ${actionLabel(action)}`;
  elGestureName.value = "";
  renderGestureList();
};

// =========================
// Call action via IPC -> main -> AHK
// =========================
async function fireAction(action, name) {
  if (!window.api || typeof window.api.runAction !== "function") {
    elStatus.textContent = "window.api.runAction não existe (preload/IPC).";
    return;
  }
  try {
    const r = await window.api.runAction(action);
    if (r?.skipped) elStatus.textContent = `Cooldown (main) — ${name}`;
    else elStatus.textContent = `MATCH: ${name} → ${actionLabel(action)}`;
  } catch (e) {
    console.error(e);
    elStatus.textContent = "Erro chamando IPC: " + (e?.message || e);
  }
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
  const w = video.videoWidth || 640;
  const h = video.videoHeight || 480;
  canvas.width = w;
  canvas.height = h;

  // FPS
  const nowPerf = performance.now();
  if (lastFrameAt) {
    const fps = 1000 / (nowPerf - lastFrameAt);
    fpsSmooth = fpsSmooth ? (fpsSmooth * 0.85 + fps * 0.15) : fps;
    elFps.textContent = String(Math.round(fpsSmooth));
  }
  lastFrameAt = nowPerf;

  ctx.save();
  ctx.clearRect(0, 0, w, h);

  // espelha
  ctx.translate(w, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(results.image, 0, 0, w, h);

  let fingerCount = 0;
  let liveMatches = {};

  if (results.multiHandLandmarks?.length) {
    const landmarks = results.multiHandLandmarks[0];
    const handed = results.multiHandedness?.[0]?.label || "Right";

    lastLandmarks = landmarks;
    elHandSeen.textContent = "sim";

    drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { lineWidth: 2 });
    drawLandmarks(ctx, landmarks, { lineWidth: 1 });

    fingerCount = countFingers(landmarks, handed);

    // comparar com gestos salvos
    const map = loadGestures();
    const nowVec = handVector(landmarks);

for (const [name, data] of Object.entries(map)) {
  const score = vectorDistance(nowVec, data.vec);
  const match = score < threshold;

  liveMatches[name] = { score, match };

  // estado por gesto
  const st = (gestureState[name] ||= {
    active: false,
    lastFireAt: 0,
    holdTimer: null,
  });

  const isHold = HOLD_ACTIONS.has(data.action);

  if (match) {
    // entrou em match agora
    if (!st.active) {
      st.active = true;

      if (isHold) {
        // começa a repetir enquanto estiver match
        // dispara já uma vez imediatamente:
        fireAction(data.action, name);

        st.holdTimer = setInterval(() => {
          // proteção: só roda se continuar ativo
          if (st.active) fireAction(data.action, name);
        }, HOLD_INTERVAL_MS);

        elStatus.textContent = `HOLD: ${name} → ${actionLabel(data.action)}`;
      } else {
        // ação normal: dispara uma vez por entrada (com cooldown)
        const now = Date.now();
        if (now - st.lastFireAt > FIRE_COOLDOWN) {
          st.lastFireAt = now;
          fireAction(data.action, name);
        }
      }
    }
  } else {
    // saiu do match
    if (st.active) {
      st.active = false;
      if (st.holdTimer) {
        clearInterval(st.holdTimer);
        st.holdTimer = null;
      }
    }
  }
}
  } else {
    lastLandmarks = null;
    elHandSeen.textContent = "não";
  }

  ctx.restore();

  elCount.textContent = String(fingerCount);
  renderGestureList(liveMatches);
});

// =========================
// Start/Stop camera
// =========================
async function start() {
  elStatus.textContent = "Iniciando câmera...";
  setCamUI(true);

  camera = new Camera(video, {
    onFrame: async () => hands.send({ image: video }),
    width: 640,
    height: 480,
  });

  await camera.start();
  elStatus.textContent = "Rodando. Mostre a mão e capture um gesto.";
}

function stop() {
  if (camera) camera.stop();
  camera = null;
  setCamUI(false);
  elStatus.textContent = "Parado.";
  lastLandmarks = null;
  elHandSeen.textContent = "não";
  elFps.textContent = "0";

  // limpa hold timers
  for (const st of Object.values(gestureState)) {
    if (st?.holdTimer) clearInterval(st.holdTimer);
    if (st) {
      st.holdTimer = null;
      st.active = false;
    }
  }

  renderGestureList({});
}


btnStart.onclick = start;
btnStop.onclick = stop;
