Utils = {}


function Utils.removeFunctionsFromTable(t)
    local result = {}
    for key, value in pairs(t) do
        if type(value) ~= "function" then
            if type(value) == "table" then
                result[key] = Utils.removeFunctionsFromTable(value)
            else
                result[key] = value
            end
        end
    end
    return result
end
