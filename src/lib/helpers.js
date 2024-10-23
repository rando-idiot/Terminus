const isDefined = function (val) {
    return val !== undefined && val !== null;
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
