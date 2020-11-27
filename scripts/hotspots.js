let hotspots = [
    {
        x: 0.53,
        y: 0.19,
        name: "Moscow"
    },
    {
        x: 0.48,
        y: 0.24,
        name: "Europe"
    },
    {
        x: 0.7,
        y: 0.17,
        name: "Siberia"
    },
];


//Set defualt values for all hotspots
hotspots.forEach(hotspot => {
    hotspot.happiness = 1;
    hotspot.trust = 1;
    hotspot.infections = 0;
    hotspot.deaths = 0;
})