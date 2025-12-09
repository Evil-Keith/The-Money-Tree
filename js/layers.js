addLayer("m", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#00bb09ff",                       // The color for this layer, which affects many elements.
    resource: "Minutes",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "Seconds",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(60),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        return mult          // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "Only Gets Harder From Here",
            description: "Time Passes 2x Faster",
            cost: new Decimal(1),

        },
        12: {
            title: "Buy Games",
            description: "Time Flies When You're Having Fun, Right? Boost Time Gain By 4x",
            cost: new Decimal(5),

        },
        13: {
            title: "'I'm Getting Used To This'",
            description: "Unspent Minutes Boost Time Gain By A Small Amount",
            effect() {
            return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(10),

        },
        14: {
            title: "1/24th Of A Day",
            description: "Unlock Hours",
            cost: new Decimal(60),

        },
    },
})

addLayer("h", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ff000069",                       // The color for this layer, which affects many elements.
    resource: "Hours",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "Minutes",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.m.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(60),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade('m',14) || player.h.unlocked},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "Go To School",
            description: "School Seems A Little Fast Today, Boost Second Gain By 2x",
            cost: new Decimal(1),

        },
        12: {
            title: "Read A Book",
            description: "Found A Nice Book, Boosts Time Gain By 4x Again",
            cost: new Decimal(3),

        },
        13: {
            title: "Almost There",
            description: "Just A Bit Longer, Hours Boost Second Gain By A Very Little Amount",
            effect() {
            return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(8),

        },
        14: {
            title: "Last Stretch(If You Dont Already Have A Ton)",
            description: "Unlock Days",
            cost: new Decimal(24),

        },
    },
})

addLayer("d", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ffd900ff",                       // The color for this layer, which affects many elements.
    resource: "Days",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "Hours",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.h.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(24),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade('h',14) || player.d.unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})
