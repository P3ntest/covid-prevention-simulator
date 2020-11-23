//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Container = PIXI.Container;

let app = new Application({});

document.getElementById("game-container").appendChild(app.view);

app.renderer.resize(window.innerWidth - 250, window.innerHeight);
document.getElementById("game-container").style.width = window.innerWidth - 250;


let mapContainer = new Container();
app.stage.addChild(mapContainer);
let mapContainerMouseDown = false;

let gameW = document.getElementById("game-container").getBoundingClientRect().width;
let gameH = document.getElementById("game-container").getBoundingClientRect().height;
hotspots.forEach(hotspot => {
    hotspot.graphic = new PIXI.Graphics();
    hotspot.graphic.beginFill(0x0000FF);
    hotspot.graphic.drawCircle(0, 0, 20);
    hotspot.graphic.endFill();
    hotspot.graphic.x = gameW * hotspot.x;
    hotspot.graphic.y = gameH * hotspot.y;
    hotspot.graphic.alpha = 0.6;
    hotspot.graphic.pivot.set(25, 25);
    hotspot.graphic.interactive = true;
    hotspot.graphic.hitArea = new PIXI.Circle(0, 0, 20);
    mapContainer.addChild(hotspot.graphic);
    hotspot.graphic.zIndex = 10;

    hotspot.graphic.mousedown = () => setClickedHotspot(hotspot);

    hotspot.graphic.mouseover = (event) => {
        let hover = document.getElementById("hotspot-hover");
        hover.style.opacity = 1;

        hover.innerHTML = hotspot.name;

        hover.style.left = (event.data.global.x - hover.getBoundingClientRect().width / 2) + "px";
        hover.style.top = (event.data.global.y + 20) + "px";
    }

    hotspot.graphic.mouseout = () => {
        document.getElementById("hotspot-hover").style.opacity = 0;
    }
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