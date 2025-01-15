'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    const prices = { 'A': 50, 'B': 30, 'C': 20, 'D': 15 };
    const offers = { 'A': { quantity: 3, offPrice: 130 }, 'B': { quantity: 2, offPrice: 45 } };
    const items = {};

    if (!/^[ABCD]*$/.test(skus)) {
        return -1;
    }

    for (const i of skus) {
        items[i] = (items[i] || 0) + 1;
    }

    let total = 0;
    for (const i in items) {
        const counter = items[i];
        if (offers[i]) {
            const { quantity, offPrice } = offers[i];
            const nr = Math.floor(counter / quantity);
            const remainder = counter % quantity;
            total += nr * offPrice + remainder * prices[i];
        }
        else {
            total += counter * prices[i];
        }
    }
    return total;
};