#Requires AutoHotkey v2.0

; Uso:
; AutoHotkey.exe actions.ahk vol_down
; AutoHotkey.exe actions.ahk space

action := A_Args.Length ? A_Args[1] : ""

switch action {
  case "vol_down":
    Send "{Volume_Down}"
  case "vol_up":
    Send "{Volume_Up}"
  case "mute":
    Send "{Volume_Mute}"
  case "space":
    Send "{Space}"
  case "enter":
    Send "{Enter}"
  case "play_pause":
    Send "{Media_Play_Pause}"
  case "send_hotkey":
    combo := A_Args.Length >= 2 ? A_Args[2] : ""
    if combo != ""
      SendEvent combo
  default:
    ; nada / desconhecido
}
