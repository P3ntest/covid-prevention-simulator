// Module to simulate the virus
// Contains many scientific values, but atm only dummy values

let simSpeed = 1; // 1 ^= 1 real hour = 1 gamesecond

function prevention(hotspot) {
    return hotspot.info * hotspot.happiness * hotspot.trust;
}

// Get chance per tick(=hour) for infection per infected
function infectionChance(hotspot) {
    let density = (hotspot.population - hotspot.deaths) / hotspot.area; // = people per km^2   values = 8 (russia) - 200 (china)

    console.log(density);
    return (1 - prevention(hotspot)); //dummy calculation
}

//Code block to execute every tick;
const tick = () => {
    hotspots.forEach(hotspot => {
        console.log(hotspot.name + ": " + infectionChance(hotspot));
        hotspot.infections = Math.ceil(infectionChance(hotspot) * hotspot.infections);
    });
    
    redrawHotspots();
    setTimeout(tick, 1 / simSpeed * 1000) // simSpeed:1 = 1 tick / second
};

//Initial Tick;