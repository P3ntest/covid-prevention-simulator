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
});

function redrawHotspots() {
    hotspots.forEach((hotspot) => {
        drawHotspot(hotspot);
    });
}

function drawHotspot(hotspot) {
    if (hotspot.graphic)
        hotspot.graphic.clear();
    else 
        hotspot.graphic = new PIXI.Graphics();

    hotspot.graphic.beginFill(hotspot.infections == 0 ?  0x44AA22 : 0xff913d); // Color if no infections = green || orange
    hotspot.graphic.drawCircle(0, 0, 20);
    hotspot.graphic.endFill();
    hotspot.graphic.x = gameW * hotspot.x;
    hotspot.graphic.y = gameH * hotspot.y;
    hotspot.graphic.alpha = 0.9;
    hotspot.graphic.pivot.set(25, 25);
    hotspot.graphic.interactive = true;
    hotspot.graphic.hitArea = new PIXI.Circle(0, 0, 20);
    mapContainer.addChild(hotspot.graphic);
    hotspot.graphic.zIndex = 10;

    hotspot.graphic.mousedown = () => setClickedHotspot(hotspot);
}