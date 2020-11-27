let hotspots = [
    {
        x: 0.53,
        y: 0.19,
        name: "Moscow",
        happiness: 0.8
    },
    {
        x: 0.48,
        y: 0.24,
        name: "Europe",
    },
    {
        x: 0.7,
        y: 0.17,
        name: "Siberia",
        hapiness: 0.4
    },
    {
        x:0.18,
        y:0.2,
        name: "Canada",
        hapiness: 0.9
    }
];


//Set defualt values for all hotspots
hotspots.forEach(hotspot => {
    if (!hotspot.happiness)
        hotspot.happiness = 1;
    if (!hotspot.trust)
        hotspot.trust = 1;
    hotspot.infections = 0;
    hotspot.deaths = 0;
})