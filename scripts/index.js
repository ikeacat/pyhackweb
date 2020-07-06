// Index.js
// For shared functions that will be used across scripts / Anything that is too small to be put in own file.

// Wouldn't it be funny if versions were named after a house cat??? I agree.
const versNum = "Tabby Cat 2.0"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function bodyLoad() {}