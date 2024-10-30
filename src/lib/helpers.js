function isDefined(val) {
    return val !== undefined && val !== null;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {Promise<void>} asyncfunc
 * @returns
 */
function spawn(asyncfunc) {
    return new Promise((res, rej) =>
        asyncfunc instanceof Promise
            ? asyncfunc.then(res).catch(rej)
            : res(asyncfunc())
    );
}
