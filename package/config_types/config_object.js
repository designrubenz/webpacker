const { isObject, deepMerge } = require('./deep_merge')

/**
  * @class
  * @extends { Object }
*/

class ConfigObject extends Object {
  get(key) {
    if (!this[key]) throw new Error(`Prop ${key} not found`)
    return this[key]
  }

  set(key, value) {
    if (!key || typeof key !== 'string') throw new Error('Key should be a string')
    if (!value) throw new Error('Value should be an object or scalar')

    this[key] = isObject(value) ? deepMerge(this[key], value) : value
    return this
  }

  delete(key) {
    if (!this[key]) throw new Error(`Prop ${key} not found`)
    delete this[key]
    return this
  }

  toObject() {
    const object = {}
    Object.keys(this).forEach(key => (object[key] = this[key]))
    return object
  }

  merge(config) {
    return Object.assign(this, deepMerge(this, config))
  }
}

module.exports = ConfigObject
