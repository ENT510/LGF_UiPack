---@meta

--- Stores registered context menus by their IDs.
---@type table<string, Context>
RegisteredContext = {}

--- Stack to store menu IDs for back navigation.
---@type table<number, string>
menuStack = {}

--- Represents an individual option within a menu, including title, description, icon, and other metadata.
---@class Option
---@field title string -- The title of the menu option.
---@field description string|nil -- The optional description of the menu option.
---@field icon string -- The icon to represent the menu option.
---@field menu string|nil -- The ID of the menu that this option might switch to (optional).
---@field metadata table<string, any>|nil -- Additional metadata for the option (optional).
---@field disabled boolean -- Flag to indicate if the option is disabled.
---@field id string -- The unique ID for the menu option.
---@field onSelect fun():void|nil -- Function to execute when the option is selected.
---@field actions table|nil -- Actions to execute, such as triggering events or switching menus.
---@field actions.server table|nil -- Server-related actions, like triggering server events.
---@field actions.server.eventName string -- The name of the server event to trigger.
---@field actions.server.eventArgs table<string, any>|nil -- The arguments to pass with the server event.
---@field actions.client table|nil -- Client-related actions, like triggering client events.
---@field actions.client.eventName string -- The name of the client event to trigger.
---@field actions.client.eventArgs table<string, any>|nil -- The arguments to pass with the client event.
---@field switchMenu string|nil -- Menu ID to switch to when selected.

--- Represents the context data, including the ID, title, close button flag, and menu options.
---@class Context
---@field id string -- The unique ID of the context.
---@field title string -- The title of the context.
---@field onBack fun():void|nil -- Triggered when You back at previous Page.
---@field enableCloseButton boolean -- Whether the close button is enabled.
---@field options Option[] -- List of menu options for this context.
---@return id 
