const toMap = (o) => {
  const map = new Map()

  for (const k in o) {
    const v = o[k]

    if (Array.isArray(v) || typeof v !== 'object' || v === null) {
      map.set(k, v)
    } else map.set(k, toMap(v))
  }

  return map
}

const toObject = (map) => {
  const o = Object.create(null)

  for (const [k, v] of map.entries()) {
    if (v instanceof Map) {
      o[k] = toObject(v)
    } else o[k] = v
  }

  return o
}

export { toMap, toObject }
