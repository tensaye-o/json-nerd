import JsonMap from './core.mjs'
import { getFiles, read, write } from './file-system.mjs'

const prefix = '../json/'
const files = await getFiles('json')

files.forEach(async (file) => {
  const json = await read(prefix + file)
  const jsonMap = new JsonMap(json)
  jsonMap.add(
    'dev',
    { merge: true },
    'object',
    'nestedObject',
    'childObject',
    'title'
  )
  write(prefix + file, jsonMap.toJson())
})
