# LGF Ui Pack

Modern `standalone` UI pack written in **TypeScript** designed to create and manage various user interface elements for **FiveM** servers. This pack provides flexible and efficient solutions to integrate UI components into your FiveM projects.

## Context Menu

<table>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/6cf634a1-7862-4726-85f4-893a2efdce51" style="width: 250px; height: 250px;">
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/95ac9bc4-14e9-487c-99d6-fd5743735cfc" style="width: 250px; height: 250px;">
    </td>
  </tr>
</table>

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

### Get The local state 
Get the state of the context independently from the `id`

```lua
---@return <boolean> true | false
LocalPlayer.state.contextBusy
```


