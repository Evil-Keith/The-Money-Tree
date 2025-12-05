let modInfo = {
	name: "The $ Tree",
	author: "Evil-Keith",
	pointsName: "Cents",
	modFiles: ["layers.js", "tree.js"],

	discordName: "T$T Discord",
	discordLink: "https://discord.com/channels/1445630295440232490/1445630296073437407",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "Bills",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2</h3><br>
		- Added Bill Layer.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade('p', 11)) gain = new Decimal(1)
	if (hasUpgrade('p', 12)) gain = gain.times(2)
	if (hasUpgrade('d', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('n', 12)) gain = gain.times(2)
	if (hasUpgrade('q', 12)) gain = gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Layer 1 Resets Money, Layer 2 Resets Layers 1 And Above, Layer 3 Resets All Above And So On",
	"1-1 = Layer 1 Upgrade 1",
	"Current Endgame: 1's"
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('q', 13)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}