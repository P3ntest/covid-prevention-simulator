let hotspots = [
    {
        x: 0.53,
        y: 0.19,
        name: "Moscow",
        happiness: 0.8,
        population: 11920000,
        area: 2500
    },
    {
        x: 0.48,
        y: 0.24,
        name: "Europe",
        population: 741000000, // people
        area: 10180000 // km^2
    },
    {
        x: 0.7,
        y: 0.17,
        name: "Siberia",
        hapiness: 0.4,
        population: 33700000,
        area: 13000000
    },
    {
        x:0.18,
        y:0.2,
        name: "Canada",
        hapiness: 0.9,
        population: 37000000,
        area: 9000000
    }
];


//Set defualt values for all hotspots
hotspots.forEach(hotspot => {
    if (!hotspot.happiness)
        hotspot.happiness = 1;
    if (!hotspot.trust)
        hotspot.trust = 1;
    if (!hotspot.info)
        hotspot.info = 0.2;
    hotspot.infections = 0;
    hotspot.deaths = 0;
});

function redrawHotspots() {
    hotspots.forEach((hotspot) => {
        drawHotspot(hotspot);
    });
}

const hotspotBorderLength = 6;

function drawHotspot(hotspot) {

    let gameW = document.getElementById("game-container").getBoundingClientRect().width;
    let gameH = document.getElementById("game-container").getBoundingClientRect().height;

    if (hotspot.graphic)
        hotspot.graphic.clear();
    else 
        hotspot.graphic = new PIXI.Graphics();

    let radius = (hotspot.infections / hotspot.population) * 25 + 5;

    if (hotspot.infections > 0 || devView) {
        hotspot.graphic.beginFill(hotspot.infections == 0 ?  0x44AA22 : 0xfe5573); // Color if no infections = green || orange
        hotspot.graphic.drawCircle(0, 0, radius + hotspotBorderLength);
        hotspot.graphic.endFill();
    
        hotspot.graphic.beginFill(hotspot.infections == 0 ?  0x44AA22 : 0xff235a); // Color if no infections = green || orange
        hotspot.graphic.drawCircle(0, 0, radius);
        hotspot.graphic.endFill();
        hotspot.graphic.x = gameW * hotspot.x;
        hotspot.graphic.y = gameH * hotspot.y;
        hotspot.graphic.pivot.set(25, 25);
        hotspot.graphic.interactive = true;
        hotspot.graphic.hitArea = new PIXI.Circle(0, 0, radius + hotspotBorderLength);
        mapContainer.addChild(hotspot.graphic);
        hotspot.graphic.zIndex = 10;
    
        hotspot.graphic.mousedown = () => setClickedHotspot(hotspot);
    }
}