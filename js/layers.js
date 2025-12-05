addLayer("p", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#d47011ff",                       // The color for this layer, which affects many elements.
    resource: "Pennies",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "Cents's",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if (hasUpgrade('n', 11)) mult = mult.times(2)
        if (hasUpgrade('q', 11)) mult = mult.times(2)
        return mult          // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "Start Making Money",
            description: "Start Money Production",
            cost: new Decimal(1),
        },
        12: {
            title: "Money Value Increases",
            description: "Cents Gain Doubled",
            cost: new Decimal(3),
        },
        13: {
            title: "We Love Nickels",
            description: "Unlock Nickels",
            cost: new Decimal(5),
        },
        14: {
            title: "Quid Pro Quo",
            description: "Pennies Boost Cents",
            effect() {
            return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(10000),
            unlocked() { return hasMilestone('n', 0)},
        },
    },
})

addLayer("n", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#808080ff",                       // The color for this layer, which affects many elements.
    resource: "Nickels",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "Pennies",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(5),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if (hasUpgrade('q',11)) mult = mult.times(2)
        return mult                  // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade('p', 13) || player.n.unlocked},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "MORE PENNIES",
            description: "Double Penny Gain (May Not Seem Important But Is)",
            cost: new Decimal(1),
        },
        12: {
            title: "Why Not More Money?",
            description: "Double Cent Gain",
            cost: new Decimal(3),
        },
        13: {
            title: "More Coin Types",
            description: "Unlocks Dimes",
            cost: new Decimal(5),
        },
    },
    milestones: {
        0: {
            requirementDescription: "50 Nickels",
            effectDescription: "Unlock New Penny Upgrades",
            done() {return player.n.points.gte(50)},
        },
    },
})

addLayer("d", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#808080ff",                       // The color for this layer, which affects many elements.
    resource: "Dimes",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "Nickels",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.n.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(2),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if (hasUpgrade('q',11)) mult = mult.times(2)
        return mult             // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {  return hasUpgrade('n', 13) || player.d.unlocked},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "Makes Cents",
            description: "Double Cents Gain Again (There Will Be One Of These At Every Layer)",
            cost: new Decimal(1),
        },
        12 : {
            title: "Even More Coins",
            description: "Unlock Quarters (The Cost Is 2.5 Dimes Which Make 25 Cents But Doesnt Make Sense Since You Cant Split A Coin And Spend It)",
            cost: new Decimal(6),
        },
    },
})

addLayer("q", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#808080ff",                       // The color for this layer, which affects many elements.
    resource: "Quarters",            // The name of this layer's main prestige resource.
    row: 3,                                 // The row this layer is on (0 is the first row).

    baseResource: "Dimes",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.d.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(2.5),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade('d', 12) || player.q.unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "Doubles",
            description: "Double Gain Of Everything Above Quarters (Except Cent Gain Cause That Seems Like Cheating)",
            cost: new Decimal(3),
        },
        12: {
            title: "Bit Expensive(A Waiting Game)",
            description: "Double Cent Gain Yet Again(Had To Make It Hard Somehow)",
            cost: new Decimal(100000),
        },
        13: {
            title: "Onto Bills",
            description: "Hey You Made It, Unlocks Dollars",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade('q', 12)},
        },
    },
})

addLayer("o", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "1's",            // The name of this layer's main prestige resource.
    row: 4,                                 // The row this layer is on (0 is the first row).

    baseResource: "Quarters",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.q.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(4),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {  return hasUpgrade('q', 13) || player.o.unlocked},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})