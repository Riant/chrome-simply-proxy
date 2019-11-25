export const Storage = {
  get(key) {
    let val = localStorage.getItem(key)
    return val ? JSON.parse(val) : ''
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  addItem(key, item) {
    let list = this.get(key) || []
    list.unshift(item)
    this.set(key, list)
    return list
  },
  deleteItemBy(key, itemKey, val) {
    let list = this.get(key)
    if (list && list.length) {
      let i = list.findIndex(_it => _it[itemKey] === val)
      if (i > -1) list.splice(i, 1)
      this.set(key, list)
    }
    return list
  },
}
