TextUI = {}

local currentTextUi = nil

function TextUI.showTextUi(data)
    currentTextUi = data

    Client.showTextUi({
        Display = true,
        TextUi = data
    })
end

function TextUI.hideTextUi()
    if currentTextUi then
        Client.showTextUi({
            Display = false,
            TextUi = currentTextUi
        })


        currentTextUi = nil
    end
end

exports("showTextUi", TextUI.showTextUi)
exports("hideTextUi", TextUI.hideTextUi)
