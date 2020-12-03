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

devView = false;

//Add Pixi to the DOM
document.getElementById("game-container").appendChild(app.view);
app.renderer.resize(window.innerWidth - 250, window.innerHeight);
document.getElementById("game-container").style.width = window.innerWidth - 250;

let mapContainer = new Container();
app.stage.addChild(mapContainer);
mapContainer.sortableChildren = true;

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

let mapTexture = new PIXI.Texture.fromImage("images/map.svg", undefined, undefined, 1.0);

let mapSprite = new Sprite(mapTexture);

mapSprite.width = document.getElementById("game-container").getBoundingClientRect().width;
mapSprite.height = document.getElementById("game-container").getBoundingClientRect().height;

mapContainer.addChild(mapSprite);
mapSprite.zIndex = -10;


hotspots[Math.floor(Math.random() * hotspots.length)].infections = 1; // Infect 1 person.

//Add Hotspot Circles
redrawHotspots();

updateGlobalStats();


//Fade out && remove loading screen after 1000 ms
// TODO: Fade after PIXI loader handler finished
setTimeout(() => {
    document.getElementById("load").style.opacity = 0;
    setTimeout(() => {
        document.getElementById("load").remove();
    }, 400);
}, 1000) 

tick();