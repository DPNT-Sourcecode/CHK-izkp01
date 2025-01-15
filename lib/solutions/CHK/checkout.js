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
    if (items['A'] && offers['A']) {
        let counter = items['A'];
        for (const offer of offers['A'].sort((a, b) => b.quantity - a.quantity)) {
            const nr = Math.floor(counter / offer.quantity);
            const remainder = counter % offer.quantity;
            total += nr * offer.offPrice;
            counter = remainder;
        }
        total += counter * prices['A'];
    }

    else if (items['E'] && offers['E']) {
        const reduce = Math.floor(items['E'] / 2);
        items['B'] = (items['B'] || 0) - reduce;
    }
    else if (items['B'] && offers['B']) {
        let counter = items['B'];
        for (const offer of offers['B'].sort((a, b) => b.quantity - a.quantity)) {
            const nr = Math.floor(counter / offer.quantity);
            const remainder = counter % offer.quantity;
            total += nr * offer.offPrice;
            counter = remainder;
        }
        total += counter * prices['B'];
    }
    else if (items['C']) {
        total += items['C'] * prices['C'];
    }
    else if (items['D']) {
        total += items['D'] * prices['C'];
    }

    return total;
};

