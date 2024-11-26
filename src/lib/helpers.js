export function isDefined(val) {
    return val !== undefined && val !== null;
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {Promise<void>} asyncfunc
 * @returns
 */
export function spawn(asyncfunc) {
    return new Promise((res, rej) =>
        asyncfunc instanceof Promise
            ? asyncfunc.then(res).catch(rej)
            : res(asyncfunc()),
    );
}

export function randomnumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isNumber(value) {
    return (
        typeof value === "number" ||
        /^((?:0[xX][0-9a-fA-F_]+)|(?:0[oO][0-7_]+)|(?:0[bB][01_]+)|(?:(?:\d+_?)+\.?(?:\d+_?)+))$/.test(
            value,
        )
    );
}
