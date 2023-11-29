# ao MUD

Build your own MUD, one room at a time. Using the ao network, and aos we can build our own MUD by spawning rooms, adding items, and exits.

using the room module, we can create ao processes as rooms, that users can enter, look for items, take an item, and look for exits.

> NOTE: Starting simple for now.

MODULE_ID = "yf8WSbOVb-7BRY4qEOC90NupAzD4L9ns5phZxBYAc7Y"

## spawning a room in aos

```lua
spawn("MODULE_ID", {
  description = "",
  ["item-type"] = "emoji",
  ["item-value"] = "🌟",
  ["item-type"] = "note",
  ["item-value"] = "Good fortune is in room #XYZ",
  door = "XYZ",
  door = "ABC"
})
```

That should return the room id in your inbox

Then you can create another room, and providing that room as a door

Once your rooms are built, set your origin room and ask users to enter.

## actions

enter room

```lua
send(ROOM, { action = "enter" })
```

look around

```lua
send(ROOM, { action = "look" })
```

take item

```lua
send(ROOM, { action = "take", itemId = 1 })
```

drop item

```lua
send(ROOM, { action = "drop", itemId = 3 })
```

> NOTE: when you look, you will see items and doors, you can enter another room by the ROOM Number of each door.

## Bonus:

You can also use the `ao-sdk` to dynamically create rooms using chatGPT to create the descriptions, and a random generator to create items and doors.

## Bonus2: 

Create NPC ao processes that also can roam around the MUD.
