---@meta


---@type table<string, {alert: Alert, promise: Promise}>

--- Represents a single Alert context with its configuration.
---@class Alert
---@field id string -- The unique ID of the alert (randomly generated).
---@field title string -- The title of the alert.
---@field message string -- The content of the alert message.
---@field type string | "info" | "error" | "warning"
---@field confirmLabel string -- The label for the confirmation button.
---@field cancelLabel string -- The label for the cancel button.
---@field icon string -- The icon displayed in the alert.
---@field offset table -- The offset of the alert on the screen, with x and y.

--- Callback function for the alert returning a boolean based on user interaction.
---@return boolean -- true if the user confirmed, false if they canceled.
