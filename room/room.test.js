import AoLoader from '@permaweb/ao-loader'
import fs from 'fs'

const wasm = fs.readFileSync('./process.wasm')

async function test() {
  const handle = await AoLoader(wasm)
  const response = await handle(null, {
    target: '1',
    tags: [
      { name: 'ao-type', value: 'spawn' },
      { name: 'description', value: 'A warm bright place' },
      { name: 'item-type', value: 'emoji' },
      { name: 'item-value', value: '⭐️' }
    ]
  }, { process: { id: "TOM" } })
  const response2 = await handle(response.buffer, {
    target: '1',
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'enter' }
    ]
  }, { process: { id: "1" } })
  console.log(response2.output)
  const response3 = await handle(response2.buffer, {
    target: '1',
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'look' }
    ]
  }, { process: { id: "1" } })
  console.log(response3.output)

  const response4 = await handle(response3.buffer, {
    target: '1',
    from: '3',
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'take' },
      { name: 'item-id', value: 1 }
    ]
  }, { process: { id: "1" } })
  console.log(response4.output)

  const response5 = await handle(response4.buffer, {
    target: '1',
    from: '4',
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'take' },
      { name: 'item-id', value: 1 }
    ]
  }, { process: { id: "1" } })
  console.log(response5.output)
}

test()