print("dwadwa")

RegisterNetEvent("vehicle:spawn")
AddEventHandler("vehicle:spawn", function(data)
    print(json.encode(data, { indent  = true }))
end)
