let hotspots = [
    {
        x: 0.6,
        y: 0.3,
        name: "Moscow",
        happiness: 0.8,
        population: 11920000,
        area: 2500
    },
    {
        x: 0.53,
        y: 0.35,
        name: "Europe",
        population: 741000000, // people
        area: 10180000 // km^2
    },
    {
        x: 0.8,
        y: 0.35,
        name: "Siberia",
        hapiness: 0.4,
        population: 33700000,
        area: 13000000
    },
    {
        x:0.24,
        y:0.3,
        name: "Canada",
        hapiness: 0.9,
        population: 37000000,
        area: 9000000
    },
    {
        x:0.14,
        y:0.36,
        name:"Whashington",
        population: 7600000,
        area: 177,
    },
    {
        x:0.14,
        y:0.43,
        name:"Californania",
        population: 39500000,
        area: 423970,
    },
    {
        x:0.2,
        y:0.47,
        name:"Texas",
        population: 29000000,
        area: 695662,
    },
    {
        x:0.3,
        y:0.35,
        name:"New York",
        population: 8300000,
        area: 783,
    },
    {
        x:0.23,
        y:0.37,
        name:"Minnesota",
        population: 5000000,
        area: 225181,
    },
  
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

    //Default values
    hotspot.population = hotspot.population ?? 1;
    hotspot.area = hotspot.area ?? 100;
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