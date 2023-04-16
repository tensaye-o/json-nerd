```js
// const jsonMap = new Map(
//   Object.entries({
//     name: 'tensaye',
//     title: 'dev',
//   })
// )
const jsonMap = new Map([
  ['name', 'tensaye'],
  ['title', 'dev'],
])
const json = Object.fromEntries(jsonMap)
```
