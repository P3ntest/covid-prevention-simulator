//File for managing the right hand side menu

//Set correct values to the right menu stats
function updateGlobalStats() {
    let infections = 0;
    let deaths = 0;
    let hotspotsCount = 0;

    let happiness = [];
    let trust = [];

    hotspots.forEach(hotspot => {
        infections += hotspot.infections;
        deaths += hotspot.deaths;
        if (true) //Check if infections/deaths has reached a certain percentage of total area population (=> is a hotstpot)
            hotspotsCount++;

        happiness.push(hotspot.happiness);
        trust.push(hotspot.trust);
    });

    //Get average values of decimals in percentage 
    let globalHappiness = Math.floor(happiness.reduce((a, b) => a + b, 0) / happiness.length * 100);
    let globalTrust = Math.floor(trust.reduce((a, b) => a + b, 0) / trust.length * 100);

    document.getElementById("global-infections").innerText = infections;
    document.getElementById("global-deaths").innerText = deaths;
    document.getElementById("total-hotspots").innerText = hotspotsCount;
    document.getElementById("global-happiness").innerText = globalHappiness;
    document.getElementById("global-trust").innerText = globalTrust;
}

function setRegionStats(hotspot) {
    document.getElementById("region-infections").innerText = hotspot.infections;
    document.getElementById("region-deaths").innerText = hotspot.deaths;
    document.getElementById("region-happiness").innerText = Math.floor(hotspot.happiness * 100);
    document.getElementById("region-trust").innerText =  Math.floor(hotspot.trust * 100);
    document.getElementById("region-title").innerText = hotspot.name;
}