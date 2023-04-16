import { readFile, writeFile, readdir } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import prettier from 'prettier'

const getFiles = async (path) => {
  try {
    const files = await readdir(path)
    return files
  } catch (err) {
    console.error(err)
  }
}

const read = async (pathname) => {
  try {
    const filePath = new URL(pathname, import.meta.url)
    const contents = await readFile(filePath, { encoding: 'UTF-8' })
    const json = JSON.parse(contents)
    return json
  } catch (err) {
    console.error(err)
  }
}

const write = async (pathname, json) => {
  try {
    const filePath = new URL(pathname, import.meta.url)
    const ac = new AbortController()
    const { signal } = ac
    const data = new Uint8Array(
      Buffer.from(
        prettier.format(JSON.stringify(json), {
          parser: 'json',
          printWidth: 60,
          tabWidth: 4,
        })
      )
    )
    const promise = writeFile(filePath, data, { signal })

    // ac.abort()
    await promise
  } catch (err) {
    console.log(err)
  }
}

export { getFiles, read, write }
