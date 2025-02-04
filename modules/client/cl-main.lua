Client                         = {}

LocalPlayer.state.contextBusy  = false
LocalPlayer.state.contextBusy  = false
LocalPlayer.state.textuiBusy   = false

local isScreenBlurActive       = false

local IsScreenFadingIn         = IsScreenFadingIn
local TriggerScreenblurFadeIn  = TriggerScreenblurFadeIn
local SetNuiFocus              = SetNuiFocus
local IsScreenFadingOut        = IsScreenFadingOut
local TriggerScreenblurFadeOut = TriggerScreenblurFadeOut
local SendNUIMessage           = SendNUIMessage
local RegisterNuiCallback      = RegisterNuiCallback



function Client.showContext(data)
    LocalPlayer.state.contextBusy = data.Display

    SetNuiFocus(data.Display, data.Display)


    if Config.enableBlurContext then
        Client.manageBlur(data)
    end

    SendNUIMessage({
        action = "showContextMenu",
        data = { Display = data.Display, Menu = data.Menu }
    })
end

RegisterNuiCallback("LGF_Context.NUI.hideContextMenu", function(data, cb)
    cb(true)
    Context.hideContextMenu()
end)

function Client.manageBlur(data)
    if data.Display and not IsScreenFadingIn() and not isScreenBlurActive then
        TriggerScreenblurFadeIn(1000)
        isScreenBlurActive = true
    end

    if not data.Display and not IsScreenFadingOut() and isScreenBlurActive then
        TriggerScreenblurFadeOut(1000)
        isScreenBlurActive = false
    end
end

function Client.showAlert(data)
    LocalPlayer.state.alertBusy = data.Display

    if data.Display and not IsNuiFocused() then
        SetNuiFocus(data.Display, data.Display)
    end

    Client.manageBlur(data)

    SendNUIMessage({
        action = "showAlert",
        data = { Display = data.Display, Alert = data.Alert }
    })
end

function Client.showTextUi(data)
    LocalPlayer.state.textuiBusy = data.Display

    SendNUIMessage({
        action = "showTextUi",
        data = { Display = data.Display, TextUi = data.TextUi }
    })
end
