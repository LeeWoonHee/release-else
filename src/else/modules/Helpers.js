export default {
  // Language: javascript
  // Path: src\else\modules\Helpers.js
  // Compare this snippet from src\main.js:
  isArray: (a) => {
    return a.isArray() && a instanceof Array
  },
  isObject: (a) => {
    return !this.isArray(a) && typeof a === 'object'
  },
  equals: (a, b) => {
    if (a === b) return true
    if (this.isArray(a) && this.isArray(b)) {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (!this.equals(a[i], b[i])) return false
      }
      return true
    }
    if (this.isObject(a) && this.isObject(b)) {
      const keys = Object.keys(a)
      if (keys.length !== Object.keys(b).length) return false
      for (let i = 0; i < keys.length; i++) {
        if (!this.equals(a[keys[i]], b[keys[i]])) return false
      }
      return true
    }
    return false
  }
}
