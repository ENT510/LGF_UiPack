![GitHub Downloads](https://img.shields.io/github/downloads/ENT510/LGF_UiPack/total?logo=github)
![GitHub Release](https://img.shields.io/github/v/release/ENT510/LGF_UiPack?logo=github)


# LGF Ui Pack (Standalone)

Modern `standalone` UI pack written in **TypeScript** designed to create and manage various user interface elements for **FiveM** servers. This pack provides flexible and efficient solutions to integrate UI components into your FiveM projects.

# Context Menu

### Register Context 
Register a new menu `context` with options.

```lua
---@param data table[] 
---@return id <string> 
exports.LGF_UiPack:registerContextMenu(data)
```

### Display Context 
Show a `context` registered, needs to be called after registration to display it.

```lua
---@param id <string> 
exports.LGF_UiPack:displayContextMenu(id)
```

### Hide Context 
Hide the currently active `context` menu.

```lua
---@return id <string> 
exports.LGF_UiPack:hideContextMenu()
```

### Get Active Context
Retrieve the current `id` of the `context` menu that is currently opened.

```lua
---@return id <string>
exports.LGF_UiPack:getActiveContextMenu()
```

### Get The local state of Context
Get the state of the context independently from the `id`

```lua
---@return <boolean> true | false
LocalPlayer.state.contextBusy
```

## Text UI

### Display a TextUI 
Display a textui with correct options

```lua
---@param data table[] 
exports.LGF_UiPack:showTextUi(data)
```

### Hide a TextUI 
Hide the current Textui Active

```lua
---@param data table[] 
exports.LGF_UiPack:hideTextUi()
```

### Get The local state of Textui
Get the state of the TextUi

```lua
---@return <boolean> true | false
LocalPlayer.state.textuiBusy
```

