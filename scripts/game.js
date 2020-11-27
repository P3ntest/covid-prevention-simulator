//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Container = PIXI.Container;

//Initiate Pixi Framework
let app = new Application({});

//Add Pixi to the DOM
document.getElementById("game-container").appendChild(app.view);

app.renderer.resize(window.innerWidth - 250, window.innerHeight);
document.getElementById("game-container").style.width = window.innerWidth - 250;

//Init mapCOntainer
let mapContainer = new Container();
app.stage.addChild(mapContainer);
let mapContainerMouseDown = false;

//Add Hotspot Circles
let gameW = document.getElementById("game-container").getBoundingClientRect().width;
let gameH = document.getElementById("game-container").getBoundingClientRect().height;
hotspots.forEach(hotspot => {
    hotspot.graphic = new PIXI.Graphics();
    hotspot.graphic.beginFill(0x44AA22);
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
});

function setClickedHotspot(hotspot) {
    document.getElementById("region-title").innerHTML = hotspot.name;
}

mapContainer.sortableChildren = true;

let mousePos = {};
app.view.onmousemove = (ev) => {
    mousePos = {
        x: ev.screenX,
        y: ev.screenY
    }
}

//Load map image
PIXI.loader.add("images/map.png").load(() => {
    let mapSprite = new Sprite(TextureCache["images/map.png"]);
    
    mapSprite.width = document.getElementById("game-container").getBoundingClientRect().width;
    mapSprite.height = document.getElementById("game-container").getBoundingClientRect().height;

    // mapSprite.alpha = 0.5;

    mapContainer.addChild(mapSprite);
    mapSprite.zIndex = -10;
});

let overGameContainer = false;
document.getElementById("game-container").addEventListener("mouseenter", () => {overGameContainer = true});
document.getElementById("game-container").addEventListener("mouseleave", () => {overGameContainer = false});

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
        if (true) //Check if infections/deaths has reached a certain percentage of total area populatino (=> is a hotstpo)
            hotspotsCount++;

        happiness.push(hotspot.happiness);
        trust.push(hotspot.trust);
    });

    let globalHappiness = Math.floor(happiness.reduce((a, b) => a + b, 0) / happiness.length * 100);
    let globalTrust = Math.floor(trust.reduce((a, b) => a + b, 0) / trust.length * 100);

    document.getElementById("global-infections").innerText = infections;
    document.getElementById("global-deaths").innerText = deaths;
    document.getElementById("total-hotspots").innerText = hotspotsCount;
    document.getElementById("global-happiness").innerText = globalHappiness;
    document.getElementById("global-trust").innerText = globalTrust;
}

updateGlobalStats();