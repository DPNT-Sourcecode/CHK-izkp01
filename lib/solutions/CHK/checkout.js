'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    const prices = { 'A': 50, 'B': 30, 'C': 20, 'D': 15, 'E': 40, 'F': 10, 'G': 20, 'H': 10, 'I': 35, 'J': 60, 'K': 70, 'L': 90, 'M': 15, 'N': 40, 'O': 10, 'P': 50, 'Q': 30, 'R': 50, 'S': 20, 'T': 20, 'U': 40, 'V': 50, 'W': 20, 'X': 17, 'Y': 20, 'Z': 21 };
    const offers = {
        'A': [{ quantity: 5, offPrice: 200 }, { quantity: 3, offPrice: 130 }],
        'B': [{ quantity: 2, offPrice: 45 }],
        'E': { quantity: 2, free: 'B' },
        'F': { quantity: 2, free: 'F' },
        'H': [{ quantity: 5, offPrice: 45 }, { quantity: 10, offPrice: 80 }],
        'K': [{ quantity: 2, offPrice: 120 }],
        'N': { quantity: 3, free: 'M' },
        'P': [{ quantity: 5, offPrice: 200 }],
        'Q': [{ quantity: 3, offPrice: 80 }],
        'R': { quantity: 3, free: 'Q' },
        'U': { quantity: 3, free: 'U' },
        'V': [{ quantity: 2, offPrice: 90 }, { quantity: 3, offPrice: 130 }],
        'groupOffer': {
            items: ['S', 'T', 'X', 'Y', 'Z'],
            offPrice: 45,
            groupSize: 3
        }
    };
    const items = {};
    let groupOfferCount = 0;
    let total = 0;

    if (!/^[A-Z]*$/.test(skus)) {
        return -1;
    }

    for (const i of skus) {
        items[i] = (items[i] || 0) + 1;
    }

    let groupItems = ['S', 'T', 'X', 'Y', 'Z'];
    for (const x of groupItems) {
        if (items[x]) {
            groupOfferCount += items[x];
        }
    }

    while (groupOfferCount >= 3) {
        total += offers.groupOffer.offPrice;

        let remainingItems = 3;

        const sortItems = groupItems.filter(item => items[item] > 0).sort((a, b) => prices[a] - prices[b]);
        console.log(sortItems);
        for (const x of sortItems) {
            const counter = items[x] || 0;
            if (items[x] > 0 && remainingItems > 0) {
                const remove = Math.min(items[x], remainingItems);
                items[x] -= remove;
                remainingItems -= remove;
            }
        }
        groupOfferCount -= 3;
    }


    if (items['E']) {
        const reduce = Math.floor(items['E'] / 2);
        items['B'] = Math.max(0, (items['B'] || 0) - reduce);
    }

    if (items['N']) {
        const reduce = Math.floor(items['N'] / 3);
        items['M'] = Math.max(0, (items['M'] || 0) - reduce);
    }

    if (items['R']) {
        const reduce = Math.floor(items['R'] / 3);
        items['Q'] = Math.max(0, (items['Q'] || 0) - reduce);
    }

    if (items['F'] >= 3) {
        const reduce = Math.floor(items['F'] / 3);
        items['F'] = Math.max(0, (items['F'] || 0) - reduce);
    }

    if (items['U'] >= 4) {
        const reduce = Math.floor(items['U'] / 4);
        items['U'] = Math.max(0, (items['U'] || 0) - reduce);
    }

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


