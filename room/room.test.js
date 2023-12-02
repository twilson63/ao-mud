import AoLoader from '@permaweb/ao-loader'
import fs from 'fs'

const wasm = fs.readFileSync('./process.wasm')

async function test() {
  const handle = await AoLoader(wasm)
  const response = await handle(null, {
    target: '1',
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'setup' },
      { name: 'description', value: 'A warm bright place' },
      { name: 'item-type', value: 'emoji' },
      { name: 'item-value', value: '⭐️' }
    ]
  }, {
    process: {
      id: "TOM"
    }
  })
  const response2 = await handle(response.buffer, {
    target: '1',
    from: "FOO",
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'enter' }
    ]
  }, { process: { id: "1" } })
  console.log(JSON.stringify(response2.messages))

  const response3 = await handle(response2.buffer, {
    target: '1',
    from: 'FOO',
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'look' }
    ]
  }, { process: { id: "1" } })
  console.log(JSON.stringify(response3.messages))

  const response4 = await handle(response3.buffer, {
    target: '1',
    from: 'FOO',
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'take' },
      { name: 'item-id', value: 1 }
    ]
  }, { process: { id: "1" } })
  console.log(JSON.stringify(response4.messages))

  const response5 = await handle(response4.buffer, {
    target: '1',
    from: 'BAR',
    tags: [
      { name: 'ao-type', value: 'message' },
      { name: 'action', value: 'take' },
      { name: 'item-id', value: 1 }
    ]
  }, { process: { id: "1" } })
  console.log(JSON.stringify(response5.messages))

}

test().catch(e => console.error(e))