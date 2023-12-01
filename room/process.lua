ao = require(".ao")
local process = { _version = "0.0.1" }

function getTagValue(tags, name)
  for i, o in ipairs(tags) do
    if o.name == name then
      return o.value
    end
  end
  return ""
end

description = "You are in a dark room, with no hope! ☠️"
items = {}
rooms = {}

function init(msg) 
  description = getTagValue(msg.tags, "description")

  local item = { type = nil, value = nil, owner = nil }
  for i, o in ipairs(msg.tags) do
    if o.name == "item-type" then
      item.type = o.value
    end
    if o.name == "item-value" then
      item.value = o.value
    end
    if item.type and item.value then
      table.insert(items, item)
      item = { type = nil, value = nil, owner = nil }
    end
    if o.name == "door" then
      table.insert(rooms, o.value)
    end
  end
end


function process.handle(msg, env) 
  ao.id = env.process.id
  ao.clearOutbox()
  if getTagValue(msg.tags, "ao-type") == "process" then
    init(msg)
    return {
      output = "initialized"
    }
  end

  local action = getTagValue(msg.tags, "action")
  if action == "enter" then
    ao.send({ body = description }, msg.from)
  end

  if action == "look" then
    local details = ""
    if #rooms > 0 then
      details = "You have " .. #rooms .. "\n"
      for i, o in ipairs(rooms) do
        details = details + "room: " .. o .. " \n"
      end
    end
    if #items > 0 then
      details = details .. "You see the following: \n"
      for i, o in ipairs(items) do
        details = details .. "- " .. i .. " [" .. o.type .. "] " .. o.value .. "\n"
      end
    end
    ao.send({
      body = description .. "\n" .. details
    }, msg.from)
  end

  if action == "take" then
    local id = getTagValue(msg.tags, "item-id")
    if items[id].owner then
      ao.send({body = "item is taken"}, msg.from)
    else
      items[id].owner = msg.from
      ao.send({
        body = "congrats you grabbed: " .. "[" .. items[id].type .. "] " .. items[id].value
      }, msg.from)
    end
  end

  if action == "drop" then
    local id = getTagValue(msg.tags, "item-id")
    if items[id].owner and msg.from == items[id].owner then
      items[id].owner = nil
      ao.send({
        body = "you dropped: " .. "[" .. items[id].type .. "] " .. items[id].value
      }, msg.from)
    end
  end
  -- do stuff
  local response = {
    output = "processed message",
    messages = ao.outbox.messages,
    spawns = {}
  }
  return response
end

return process
