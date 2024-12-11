
export function isDefined(val) {
  return val !== undefined && val !== null
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * @param {Promise<void>} asyncfunc
 * @returns
 */
export function spawn(asyncfunc) {
  return new Promise((res, rej) =>
    asyncfunc instanceof Promise
      ? asyncfunc.then(res).catch(rej)
      : res(asyncfunc())
  )
}

export function randomnumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function isNumber(value) {
  return (
    typeof value === 'number' ||
    /^((?:0[xX][0-9a-fA-F_]+)|(?:0[oO][0-7_]+)|(?:0[bB][01_]+)|(?:(?:\d+_?)+\.?(?:\d+_?)+))$/.test(
      value
    )
  )
}

export function assert(foo, message) {
  if (!foo) throw new Error(message)
}

export function debounce(func, delay) {
  let timeoutId;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay)
  }
}

/**
 * @link {https://stackoverflow.com/a/52171480}
 */
export function hash(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

Math.clamp = function(val, min, max) {
  return Math.max(Math.min(val, max), min)
}
