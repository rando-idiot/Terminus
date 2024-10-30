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
            : res(asyncfunc())
    );
}
