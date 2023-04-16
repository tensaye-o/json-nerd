import { toMap, toObject } from './util.mjs'

class JsonMap {
  constructor(json) {
    this.map = toMap(json)
  }

  _lookup(keys) {
    let cur = this.map
    for (let i = 0; i < keys.length; i++) {
      cur = cur.get(keys[i])
      if (!cur) return null
    }
    return cur
  }

  get(...keys) {
    const map = this._lookup(keys)
    return map ? map.get(keys[keys.length - 1]) : undefined
  }

  set(value, ...keys) {
    const map = this._lookup(keys.slice(0, -1))
    if (!map) throw new Error('Invalid key path')
    map.set(keys[keys.length - 1], value)
  }

  delete(...keys) {
    const map = this._lookup(keys.slice(0, -1))
    if (!map) return false
    return map.delete(keys[keys.length - 1])
  }

  add(value, options = {}, ...keys) {
    const { merge = false } = options
    const parentKeys = keys.slice(0, -1)
    let parentMap = this._lookup(parentKeys)

    if (!parentMap) {
      parentMap = this.map
      parentKeys.forEach((key) => {
        if (!parentMap.has(key)) parentMap.set(key, new Map())
        parentMap = parentMap.get(key)
      })
    }

    const targetKey = keys[keys.length - 1]
    if (merge && parentMap.has(targetKey)) {
      const existingValue = parentMap.get(targetKey)

      if (Array.isArray(existingValue) && Array.isArray(value))
        parentMap.set(targetKey, [...existingValue, ...value])
      else if (
        existingValue instanceof Map &&
        typeof value === 'object' &&
        value !== null
      ) {
        const existingJson = toObject(existingValue)
        const mergedJson = { ...existingJson, ...value }
        parentMap.set(targetKey, toMap(mergedJson))
      } else parentMap.set(targetKey, value)
    } else parentMap.set(targetKey, value)
  }

  toJson() {
    return toObject(this.map)
  }
}

export default JsonMap
