Alert = {}
local activeAlerts = {}
local currentAlert = nil

local function generateAlertID()
    return math.random(1000, 9999)
end

function Alert.showAlertDialog(alertData)
    local alertID = generateAlertID()
    local promiseInstance = promise.new()

    activeAlerts[alertID] = {
        alert = alertData,
        promise = promiseInstance
    }

    alertData.id = alertID

    Client.showAlert({
        Display = true,
        Alert = alertData
    })

    currentAlert = activeAlerts[alertID]

    return Citizen.Await(promiseInstance)
end

function Alert.handlePromise(alertID, result)
    local alertInfo = activeAlerts[alertID]
    if not alertInfo then return end

    Client.showAlert({
        Display = false,
        Alert = alertInfo.alert
    })

    alertInfo.promise:resolve(result == "confirm")
    currentAlert = nil
    activeAlerts[alertID] = nil
end

function Alert.dismissCurrentAlert()
    if currentAlert then
        local alertID = currentAlert.alert.id
        Alert.handlePromise(alertID, "cancel")
    end
end

RegisterNUICallback("LGF_UiPack.NUI.handleAlertAction", function(responseData, callback)
    callback("ok")

    local alertID = tonumber(responseData.id)
    local alertInfo = activeAlerts[alertID]

    if alertInfo then
        Alert.handlePromise(alertID, responseData.action)
    end
end)

exports("registerAlert", Alert.showAlertDialog)
exports("closeAlert", Alert.dismissCurrentAlert)
