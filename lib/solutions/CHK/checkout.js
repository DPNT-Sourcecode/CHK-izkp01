'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    const prices = { 'A': 50, 'B': 30, 'C': 20, 'D': 15, 'E': 40, 'F': 10 };
    const offers = {
        'A': [{ quantity: 5, offPrice: 200 }, { quantity: 3, offPrice: 130 }],
        'B': [{ quantity: 2, offPrice: 45 }],
        'E': { quantity: 2, free: 'B' },
        'F': { quantity: 3, offPrice: 20 }
    };
    const items = {};

    if (!/^[ABCDEF]*$/.test(skus)) {
        return -1;
    }

    for (const i of skus) {
        items[i] = (items[i] || 0) + 1;
    }

    if (items['E']) {
        const reduce = Math.floor(items['E'] / 2);
        items['B'] = Math.max(0, (items['B'] || 0) - reduce);
    }

    if (items['F'] >= 3) {
        const reduce = Math.floor(items['F'] / 3);
        items['F'] = reduce * 2 + (items['F'] % 3);
    }

    let total = 0;
    for (const i in items) {
        let counter = items[i];
        if (offers[i]) {
            if (Array.isArray(offers[i])) {
                for (const offer of offers[i].sort((a, b) => b.quantity - a.quantity)) {
                    const nr = Math.floor(counter / offer.quantity);
                    const remainder = counter % offer.quantity;
                    total += nr * offer.offPrice;
                    counter = remainder;
                }
                total += counter * prices[i];
            }
            else if (offers[i].free) {
                total += counter * prices[i];
            }
        }
        else {
            total += counter * prices[i];
        }
    }
    return total;
};