//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Container = PIXI.Container;

//Initiate Pixi Framework
let app = new Application({
    antialias: true
});

//Add Pixi to the DOM
document.getElementById("game-container").appendChild(app.view);
app.renderer.resize(window.innerWidth - 250, window.innerHeight);
document.getElementById("game-container").style.width = window.innerWidth - 250;

let mapContainer = new Container();
app.stage.addChild(mapContainer);
let mapContainerMouseDown = false;
mapContainer.sortableChildren = true;
let overGameContainer = false;
document.getElementById("game-container").addEventListener("mouseenter", () => {overGameContainer = true});
document.getElementById("game-container").addEventListener("mouseleave", () => {overGameContainer = false});

let timeToVaccine = 8600; //hours;

let clickedHotspot = null;

// Keep empty function for future features
function setClickedHotspot(hotspot) {
    clickedHotspot = hotspot;
    setRegionStats(hotspot)
}

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

    mapContainer.addChild(mapSprite);
    mapSprite.zIndex = -10;
});


hotspots[Math.floor(Math.random() * hotspots.length)].infections = 1; // Infect 1 person.

//Add Hotspot Circles
redrawHotspots();

updateGlobalStats();

tick();