import { assert, hash, isDefined } from "./helpers.js"

const GLOBAL_CLASSES = []

export function save(key, obj) {
  if (!isDefined(obj)) return void localStorage.clear(key)
  const str = serialize(obj)
  localStorage.setItem(key, str)
}

export function load(key, src) {
  const str = localStorage.getItem(key)
  if (!isDefined(str)) return false
  const obj = JSON.parse(str)
  console.log("loaded:\n",obj, src)
  deserializeOnto(obj, src);
  return true
}

export function serialize(obj) {
  if (!isDefined(obj)) return null
  if (obj instanceof Array) return `[${obj.map(serialize).toString()}]`
  switch (typeof obj) {
    case "object":
      return toJson(obj)
    case "function":
      // console.warn("function serialized, saving as hash: ", obj.toString())
      return obj.hash ?? hash(obj.toString())
    default:
      return JSON.stringify(obj)
  }
}

function toJson(obj) {
  if (isDefined(obj.toJson)) return obj.toJson();
  if (Object.getPrototypeOf(obj).constructor.name !== "Object")
    console.error(`Class ${Object.getPrototypeOf(obj).constructor.name
      } doesn't implement \`toJson\` serialization.\nUsing default serialization.\nPrivate parameters won't be saved.`
    )
  const entries = Object.entries(obj)
  if (entries.length === 0) {
    const constr = Object.getPrototypeOf(obj).constructor
    const bar = Object.getOwnPropertyNames(obj.__proto__)
    return JSON.stringify(obj)
  }
  let result = obj.class ? "{" : `{"class":"${Object.getPrototypeOf(obj).constructor.name}",`
  for (const [key, val] of entries) {
    result += `"${key}":${serialize(val)},`
  }
  result = result.replace(/,$/, "}")
  return result
}

function deserializeOnto(obj, src) {
  if (!isDefined(obj)) return
  if (!(typeof obj === "object")) return console.warn("TODO: Non object types", obj)
  if (obj instanceof Array) return console.warn("TODO: Arrays", obj)

  const constructor = Object.getPrototypeOf(src).constructor

  if (constructor.name !== obj.class)
    console.warn("Saved data prototypes don't match, data may be corrupted.\nGot:", constructor.name, obj.class)

  if (obj.class !== "Object") {
    // updates src from object obj
    return void src.fromJson(obj)
  }

  const src_keys = Object.keys(src)
  const obj_keys = Object.keys(obj).filter(key => key != "class")

  for (const key of src_keys) {
    switch (typeof obj[key]) {
      case "object":
        deserializeOnto(obj[key], src[key]);
        break;
      case "function":
        src[key] = eval(obj[key])
      default:
        src[key] = obj[key]
    }
  }
}

export function deserialize(obj, rec = 2) {
  if (!isDefined(obj)) return '""'
  if (!(typeof obj === "object")) return console.warn("TODO: Non object types", obj)
  if (obj instanceof Array) return console.warn("TODO: Arrays", obj)

  const class_ = getGlobalClass(obj.class)
  assert(isDefined(class_),
    `Class ${obj.class} is serialized, but not defined in global scope.\nAdd to global scope with \`makeClassGlobal\``
  )

  if (rec) for (const [k, v] of Object.entries(obj)) {
    deserialize(v, rec - 1)
  }
}

export function makeClassGlobal(obj) {
  if (!(typeof obj === 'function' && typeof obj.prototype === 'object'))
    throw new Error(obj, "This is not a class descriptor")
  GLOBAL_CLASSES[obj.name] = obj
}

export function getGlobalClass(name) {
  return GLOBAL_CLASSES[name]
}
