// Module to simulate the virus
// Contains many scientific values, but atm only dummy values

let simSpeed = 1; // 1 ^= 1 real hour = 1 gamesecond

function prevention(hotspot) {
    return hotspot.info * hotspot.happiness * hotspot.trust;
}

// Get chance per tick(=hour) for infection per infected
function infectionChance(hotspot) {
    let density = (hotspot.population - hotspot.deaths) / hotspot.area; // = people per km^2   values = 8 (russia) - 200 (china)

    density = 100;

    return (1 - prevention(hotspot)) * density / 5000; //dummy calculation
}

function spreadChance(from, to) {
    let distance = Math.sqrt(
        Math.pow(Math.abs(from.x - to.x), 2) +
        Math.pow(Math.abs(from.y - to.y), 2)
    )

    return (1 - prevention(from) * prevention(to) * distance) * from.infections * (1 - from.info) / 1000;
}

//Code block to execute every tick;
const tick = () => {

    // Increse infected
    hotspots.forEach(hotspot => {
        hotspot.infections = Math.round(hotspot.infections + Math.random() * Math.ceil(infectionChance(hotspot) * hotspot.infections));
    
        //Check for spread
        hotspots.forEach(to => {
            if (to != hotspot) {
                if (Math.random() < spreadChance(hotspot, to))
                    to.infections++;    
            }
        });
    });
    
    timeToVaccine--;

    // Update graphical values
    redrawHotspots();

    //Update menu for selected Hotspot
    if (clickedHotspot)
        setRegionStats(clickedHotspot);

    updateGlobalStats();

    // Start next tick
    setTimeout(tick, 1 / simSpeed * 1000) // simSpeed:1 = 1 tick / second
};

//Initial Tick;