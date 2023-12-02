# MUD Example

```sh
npx @permaweb/aos wallet.json
```

create a read message function

```
function read(n) 
  return inbox[n].tags[4].value
end
```

set mud room module to a variable

```
room = "8guRl4724nRGnT1K67zzrwx4Te69PGkESsDSGyRYLa0"
```

create the treasure room

```
spawn(room, {})
treasureRoom = read(1)
sendraw(treasureRoom, {
  { name="action", value = "setup" },
  { name="description", value = "Congrats! You made it to the kingdom!" },
  { name="item-type", value = "diamond" },
  { name="item-value", value = "💎" },
  { name="item-type", value = "sword" },
  { name="item-value", value = "🗡" }
})
spawn(room, {})
pitRoom = read(#inbox)
sendraw(pitRoom, {
  { name = "action", value = "setup" },
  { name = "description", value = "You are in the bottomless pit of doom! There is no exit!" }
})

spawn(room, {})
entryRoom = read(#inbox)
sendraw(entryRoom, {
  { name = "action", value = "setup" },
  { name = "description", value = "Welcome to a room choice, look to choose your door of fortune"},
  { name = "door", value = treasureRoom },
  { name = "door", value = pitRoom }
})

```