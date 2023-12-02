# ao MUD

Build your own MUD, one room at a time. Using the ao network, and aos we can build our own MUD by spawning rooms, adding items, and exits.

using the room module, we can create ao processes as rooms, that users can enter, look for items, take an item, and look for exits.

> NOTE: Starting simple for now.

MODULE_ID = "gx58zbM817pvoRNhBEfamL5KGjmcW_LaaBRKmsUQBRI"


## spawning a room in aos

```lua
spawn("gx58zbM817pvoRNhBEfamL5KGjmcW_LaaBRKmsUQBRI", {})
-- get process id from inbox
send("SPAWNED_PROCESS_ID", { action = "setup", description = "You have entered the kingdom!" })
-- spawn a new room
spawn("gx58zbM817pvoRNhBEfamL5KGjmcW_LaaBRKmsUQBRI", {})
send("NEW_PROCESS", { action = "setup", description = "Welcome to the two room dungeon", door = "SPAWNED_PROCESS_ID"})
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
