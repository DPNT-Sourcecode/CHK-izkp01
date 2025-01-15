'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    const prices = { 'A': 50, 'B': 30, 'C': 20, 'D': 15, 'E': 40 };
    const offers = {
        'A': [{ quantity: 3, offPrice: 130 }, { quantity: 5, offPrice: 200 }],
        'B': { quantity: 2, offPrice: 45 },
        'E': { quantity: 2, free: 'B' }
    };
    const items = {};

    if (!/^[ABCDE]*$/.test(skus)) {
        return -1;
    }

    for (const i of skus) {
        items[i] = (items[i] || 0) + 1;
    }

    let total = 0;
    for (const i in items) {
        let counter = items[i];
        if (i === 'A' && offers[i]) {
            for (const offer of offers[i].sort((a, b) => b.quantity - a.quantity)) {
                const nr = Math.floor(counter / offer.quantity);
                const remainder = counter % offer.quantity;
                total += nr * offer.offPrice;
                counter = remainder;
            }
        }
        else if (i === 'B' && offers[i]) {
            for (const offer of offers[i].sort((a, b) => b.quantity - a.quantity)) {
                const nr = Math.floor(counter / offer.quantity);
                const remainder = counter % offer.quantity;
                total += nr * offer.offPrice;
                counter = remainder;
            }
        }
        else if (i === 'E' && offers[i]) {
            const reduce = Math.floor(counter / 2);
            items['B'] = (items['B'] || 0) + reduce;
        }
        else {
            total += counter * prices[i];
        }

    }
    return total;
};