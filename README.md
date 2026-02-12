# 🎛️ Gesture Studio 

Controle o computador usando **gestos com a mão**, via **webcam + MediaPipe**, com ações executadas pelo **AutoHotkey** (volume, play/pause, space, etc.).

O Gesture Studio é um aplicativo desktop que permite ao usuário **criar gestos personalizados** e associá-los a **ações do sistema**, tudo em tempo real.

---

## ✨ O que você pode fazer

- Criar **gestos personalizados** com a mão
- Associar cada gesto a uma **ação específica**
- Executar **ações contínuas** (ex: aumentar/diminuir volume enquanto o gesto estiver ativo)
- Rodar o app em background como um **aplicativo de sistema**
- Usar tudo em um app desktop feito com **Electron**

---

## 🚀 Funcionalidades

- 📷 Detecção de mão em tempo real (**MediaPipe Hands**)
- ✋ Cadastro de gestos personalizados (template matching)
- 🎚️ Associação de gestos a ações do sistema:
  - Diminuir / aumentar volume
  - Mute
  - Play / Pause
  - Space, Enter, entre outros
- 🔁 Ações contínuas enquanto o gesto estiver em **MATCH**
- 💾 Gestos salvos localmente (**localStorage**)
- 🖥️ Aplicativo roda em background (**system tray**)
- 📦 Instalador Windows com **wizard (NSIS)**
- 🔐 **AutoHotkey embutido** (não exige instalação no PC do usuário)

---

## 🧠 Como funciona (visão geral)

1. A câmera captura a mão do usuário  
2. O MediaPipe detecta **21 pontos (landmarks)** da mão  
3. O app gera um **vetor de distâncias normalizadas** representando o formato da mão  
4. O usuário salva esse vetor como um **gesto**  
5. Em tempo real, o gesto atual é comparado com os gestos cadastrados  
6. Quando a similaridade ultrapassa o **threshold** → **MATCH**  
7. O renderer envia a ação via **IPC**  
8. O processo principal executa o **AutoHotkey** com o comando correspondente  

---

## 🗂️ Estrutura do projeto

```text
play-pause/
├─ main.js                # Processo principal (Electron)
├─ preload.js             # Ponte segura IPC
├─ actions.ahk            # Script único de ações
├─ vendor/
│  └─ ahk/
│     └─ AutoHotkey.exe   # AutoHotkey embutido
├─ renderer/
│  ├─ index.html          # Frontend
│  └─ app.js              # Lógica de gestos
├─ icon.ico
├─ package.json
└─ README.md

```

---

## Atalhos personalizados (novo)

- Cadastro acessivel de novo atalho com gravacao de teclas (ex.: `Alt+Tab`)
- Montagem por partes com input + botao `+` para criar sequencias (ex.: `CTRL+K+J`)
- Aceita tecla simples sem modificador (ex.: `K`)
- Catalogo reutilizavel de atalhos para vincular em varios gestos
- Gerenciamento em Configuracoes para listar, editar e apagar atalhos salvos
- Cada atalho salvo tem modo de disparo: `once` ou `repeat` (repete enquanto gesto ativo)
- Atalho customizado salvo no `localStorage` junto do estado da aplicacao

## Formato de acao no IPC

- Legado (mantido): `window.api.runAction("vol_down")`
- Novo formato:
  - `window.api.runAction({ kind: "builtin", action: "vol_down" })`
  - `window.api.runAction({ kind: "hotkey", combo: "ALT+TAB" })`

## Limitacoes de seguranca para hotkeys

- Permitido: tecla simples (ex.: `K`) ou modificadores `CTRL`/`ALT`/`SHIFT`/`WIN` + sequencia de teclas
- Permitido: teclas de midia (`VOLUME_UP`, `VOLUME_DOWN`, `VOLUME_MUTE`, `MEDIA_PLAY_PAUSE`, `MEDIA_NEXT`, `MEDIA_PREV`)
- Teclas de midia: apenas item unico (sem modificador e sem sequencia)
- Em sequencia, modificadores valem ate o fim (ex.: `CTRL+K+J`)
- Nao permitido: comando AutoHotkey arbitrario
