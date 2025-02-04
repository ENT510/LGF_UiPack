Context = {}
local RegisteredContext = {}
local menuStack = {}
local currentIndex = 0


function Context.registerContext(data)
    currentIndex = currentIndex + 1
    local id = data.id
    RegisteredContext[id] = data
    menuStack[currentIndex] = id

    if Config.enableDebugContext then
        Shared.debug("info", ("Registering new context with id %s at index %s:"):format(id, currentIndex))
        Shared.debug("info", "Current menu stack: ", table.concat(menuStack, ", "))
    end
    return id
end

function Context.showContextMenu(menuID)
    local menu = RegisteredContext[menuID]

    if menu then
        Context.currentMenuID = menuID
        Client.showContext({ Display = true, Menu = Utils.removeFunctionsFromTable(menu), })

        if Config.enableDebugContext then
            Shared.debug("info", ("Showing context menu with id %s"):format(menuID))
        end
    else
        if Config.enableDebugContext then
            Shared.debug("error", ("Menu with id %s not found"):format(menuID))
        end
    end
end

function Context.hideContextMenu()
    local currentMenu = RegisteredContext[Context.currentMenuID]
    if currentMenu then
        if currentMenu.onCloseMenu then
            currentMenu.onCloseMenu()
        end

        Client.showContext({ Display = false, Menu = Utils.removeFunctionsFromTable(currentMenu) })
    else
        if Config.enableDebugContext then
            Shared.debug("error", ("No menu is currently active to hide"))
        end
    end
end

function Context.backToPreviousMenu()
    if currentIndex > 1 then
        local currentMenuID = menuStack[currentIndex]
        local currentMenu = RegisteredContext[currentMenuID]

        if currentMenu and currentMenu.onBack then
            currentMenu.onBack()
        end


        menuStack[currentIndex] = nil
        currentIndex = currentIndex - 1
        local previousMenuID = menuStack[currentIndex]

        Wait(100) -- Preventing bug when player click to much the arrow for backing


        if previousMenuID then
            Context.showContextMenu(previousMenuID)
            if Config.enableDebugContext then
                Shared.debug("info",
                    ("Going to previous menu with id %s at index %s"):format(previousMenuID, currentIndex))
            end
        else
            if Config.enableDebugContext then
                Shared.debug("error", "No previous menu found to go back to")
            end
        end
    end
end

RegisterNuiCallback("LGF_Context.NUI.backPreviousMenu", function(data, cb)
    Context.backToPreviousMenu()
    cb(true)
end)


RegisterNuiCallback("LGF_Context.NUI.handleMenuSelection", function(data, cb)
    local menu = RegisteredContext[Context.currentMenuID]

    if menu then
        for _, item in ipairs(menu.options) do
            if item.id == data.id then
                -- If the item has an onSelect function, execute it and block further event handling
                if item.onSelect then
                    item.onSelect()
                    cb(true)
                    return
                end

                if item.switchMenu then
                    Context.showContextMenu(item.switchMenu)
                end

                if item.actions then
                    if item.actions.server then
                        local serverArgs = item.actions.server.eventArgs or {}
                        if item.actions.server.eventName then
                            TriggerServerEvent(item.actions.server.eventName, serverArgs)
                        end
                    end

                    if item.actions.client then
                        local clientArgs = item.actions.client.eventArgs or {}

                        if item.actions.client.eventName then
                            TriggerEvent(item.actions.client.eventName, clientArgs)
                        end
                    end
                end
                break
            end
        end
    end

    cb(true)
end)



exports("registerContextMenu", Context.registerContext)
exports("displayContextMenu", Context.showContextMenu)
exports("hideContextMenu", Context.hideContextMenu)
exports("getActiveContextMenu", function() return Context.currentMenuID end)
