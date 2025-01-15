'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    const prices = { 'A': 50, 'B': 30, 'C': 20, 'D': 15, 'E': 40, 'F': 10, 'G': 20, 'H': 10, 'I': 35, 'J': 60, 'K': 80, 'L': 90, 'M': 15, 'N': 40, 'O': 10, 'P': 50, 'Q': 30, 'R': 50, 'S': 30, 'T': 20, 'U': 40, 'V': 50, 'W': 20, 'X': 90, 'Y': 10, 'Z': 50 };
    const offers = {
        'A': [{ quantity: 5, offPrice: 200 }, { quantity: 3, offPrice: 130 }],
        'B': [{ quantity: 2, offPrice: 45 }],
        'E': { quantity: 2, free: 'B' },
        'F': { quantity: 2, free: 'F' },
        'H': [{ quantity: 5, offPrice: 45 }, { quantity: 10, offPrice: 80 }],
        'K': [{ quantity: 2, offPrice: 150 }],
        'N': { quantity: 3, free: 'M' },
        'P': [{ quantity: 5, offPrice: 200 }],
        'Q': [{ quantity: 3, offPrice: 80 }],
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
        items['F'] = Math.max(0, (items['F'] || 0) - reduce);
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
