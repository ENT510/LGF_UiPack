fx_version 'adamant'
game 'gta5'
author 'ENT510'
version '1.0.0'
lua54 'yes'


shared_scripts {
    "@ox_lib/init.lua",
    "config.lua",
    "shared.lua",
}

client_scripts {
    'modules/client/cl-utils.lua',
    'modules/client/cl-main.lua',
    'modules/client/context/*.lua',
    'modules/client/alert/*.lua',
    'modules/client/textui/*.lua',
}

server_scripts {
    'modules/server/sv-callback.lua',
}

files { 'web/build/index.html', 'web/build/**/*', }
ui_page 'web/build/index.html'
